import { Inject, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserEntity } from '@/modules/user/domain/entities/user.entity'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { GetCurrentUserQuery } from '../get-curent-user.query'

@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserHandler implements IQueryHandler<GetCurrentUserQuery> {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository) {}

  async execute(query: GetCurrentUserQuery): Promise<UserEntity> {
    const { id } = query
    const result = await this.userRepository.findById(id, {
      omit: {
        password: true,
      },
    })

    if (!result) {
      throw new NotFoundException('User not found')
    }

    return result
  }
}
