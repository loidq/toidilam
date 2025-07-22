import { Inject, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserEntity } from '@/modules/user/domain/entities/user.entity'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { GetUserByEmailQuery } from '../user.queries'
@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository) {}

  async execute({ email }: GetUserByEmailQuery): Promise<UserEntity> {
    const result = await this.userRepository.findById(email, {
      omit: {
        password: true,
      },
    })
    if (!result) throw new NotFoundException('User not found')
    return result
  }
}
