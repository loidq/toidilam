import { Injectable } from '@nestjs/common'
import { Prisma, User as PrismaUser } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  UserBaseQueryOptions,
  UserCreateInput,
  UserFindQueryOptions,
  UserUpdateInput,
  UserWhereUniqueInput,
} from '@/infrastructure/prisma/types/user-query-options.types'

import { UserEntity } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository'
import { UserMapper } from '../mappers/user.mapper'

@Injectable()
export class UserPrismaRepository
  extends BasePrismaRepository<
    UserEntity,
    Prisma.UserWhereInput,
    UserWhereUniqueInput,
    UserCreateInput,
    UserUpdateInput,
    Prisma.UserSelect,
    Prisma.UserInclude,
    Prisma.UserOrderByWithRelationInput,
    Prisma.UserScalarFieldEnum,
    Prisma.UserAggregateArgs
  >
  implements IUserRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaUser: PrismaUser): UserEntity {
    return UserMapper.toDomain(prismaUser)
  }

  protected toPrismaCreate(user: UserEntity): UserCreateInput {
    return UserMapper.toPrismaCreate(user)
  }

  protected toPrismaUpdate(user: UserEntity): UserUpdateInput {
    return UserMapper.toPrismaUpdate(user)
  }

  // Domain specific methods
  async findById(id: string, options?: UserBaseQueryOptions): Promise<UserEntity | null> {
    return await this.findUnique({ id }, options)
  }

  async findByEmail(email: string, options?: UserBaseQueryOptions): Promise<UserEntity | null> {
    return await this.findUnique({ email }, options)
  }

  async findOne(options?: UserFindQueryOptions): Promise<UserEntity | null> {
    return await this.findFirst(options)
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const prismaData = this.toPrismaCreate(user)
    return await this.create(prismaData)
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    const prismaData = this.toPrismaUpdate(user)
    return await this.update({ id: user.id }, prismaData)
  }

  async softDeleteUser(id: string): Promise<boolean> {
    return await this.softDelete({ id })
  }
  async deleteUser(id: string): Promise<boolean> {
    return await this.delete({ id })
  }

  async existsById(id: string): Promise<boolean> {
    return await this.exists({ id })
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.exists({ email })
  }

  // Extended methods using query options
  async findUsersWithPagination(
    page: number = 1,
    limit: number = 10,
    options?: UserFindQueryOptions,
  ): Promise<{ users: UserEntity[]; total: number }> {
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      this.findMany({
        ...options,
        skip,
        take: limit,
      }),
      this.count({ where: options?.where }),
    ])

    return { users, total }
  }
}
