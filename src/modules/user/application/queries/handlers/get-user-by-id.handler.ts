import { Inject, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserEntity } from '@/modules/user/domain/entities/user.entity'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { UserCacheService } from '../../services/user-cache.service'
import { GetUserByIdQuery } from '../user.queries'

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    private readonly userCacheService: UserCacheService,
  ) {}

  async execute({ userId }: GetUserByIdQuery): Promise<UserEntity> {
    // 1. Kiểm tra cache trước
    const cachedUser = await this.userCacheService.getCachedUser(userId)
    if (cachedUser) {
      return cachedUser
    }

    // 2. Nếu không có cache, query từ database
    const result = await this.userRepository.findById(userId, {
      omit: {
        password: true,
      },
    })

    if (!result) throw new NotFoundException('User not found')

    // 3. Cache kết quả
    await this.userCacheService.cacheUser(userId, result)

    return result
  }
}
