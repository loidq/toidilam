import { Injectable } from '@nestjs/common'
import { Prisma, User as PrismaUser, UserStatus as PrismaUserStatus } from '@prisma/client'

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
  protected toDomain(data: PrismaUser): UserEntity {
    return new UserEntity({
      id: data.id,
      email: data.email,
      password: data.password,
      name: data.name,
      status: data.status as UserEntity['status'],
      country: data.country ?? undefined,
      bio: data.bio ?? undefined,
      photo: data.photo ?? undefined,
      dob: data.dob ?? undefined,
      settings: data.settings as UserEntity['settings'],
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      createdBy: data.createdBy ?? undefined,
      updatedBy: data.updatedBy ?? undefined,
      deletedAt: data.deletedAt ?? undefined,
      isDeleted: data.isDeleted,
    })
  }

  protected toPrismaCreate(data: UserEntity): UserCreateInput {
    return {
      email: data.email,
      password: data.password,
      name: data.name,
      status: data.status as PrismaUserStatus,
      country: data.country,
      bio: data.bio,
      photo: data.photo,
      dob: data.dob,
      settings: data.settings,
      createdBy: data.createdBy,
    }
  }

  // Domain specific methods
  async findById(id: string, options?: UserBaseQueryOptions): Promise<UserEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findByEmail(email: string, options?: UserBaseQueryOptions): Promise<UserEntity | null> {
    return this.findUnique({ email }, options)
  }

  async findOne(options?: UserFindQueryOptions): Promise<UserEntity | null> {
    return this.findFirst(options)
  }

  async create(data: UserEntity): Promise<UserEntity> {
    return super.create(data)
  }

  async update(where: UserWhereUniqueInput, data: UserEntity): Promise<UserEntity> {
    return super.update(where, data)
  }

  async softDelete(where: UserWhereUniqueInput): Promise<boolean> {
    return super.softDelete(where)
  }
  async delete(where: UserWhereUniqueInput): Promise<boolean> {
    return super.delete(where)
  }

  async existsById(id: string): Promise<boolean> {
    return super.exists({ id })
  }

  async existsByEmail(email: string): Promise<boolean> {
    return super.exists({ email })
  }

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
