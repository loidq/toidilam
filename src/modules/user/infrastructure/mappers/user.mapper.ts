import { Prisma, User as PrismaUser, UserStatus as PrismaUserStatus } from '@prisma/client'

import { UserEntity, UserStatus } from '../../domain/entities/user.entity'

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): UserEntity {
    return new UserEntity(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.name,
      prismaUser.status as UserStatus,
      prismaUser.country ?? undefined,
      prismaUser.bio ?? undefined,
      prismaUser.photo ?? undefined,
      prismaUser.dob ?? undefined,
      prismaUser.settings as Record<string, any>,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.createdBy ?? undefined,
      prismaUser.updatedBy ?? undefined,
      prismaUser.deletedAt ?? undefined,
      prismaUser.isDeleted,
    )
  }

  static toPrismaCreate(user: UserEntity): Prisma.UserCreateInput {
    return {
      email: user.email,
      password: user.password,
      name: user.name,
      status: user.status as PrismaUserStatus,
      country: user.country,
      bio: user.bio,
      photo: user.photo,
      dob: user.dob,
      settings: user.settings,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted,
    }
  }
  static toPrismaUpdate(user: UserEntity): Prisma.UserUpdateInput {
    const updateData: Prisma.UserUpdateInput = {
      email: user.email,
      password: user.password,
      name: user.name,
      status: user.status as PrismaUserStatus,
      country: user.country,
      bio: user.bio,
      photo: user.photo,
      dob: user.dob,
      settings: user.settings,
      updatedBy: user.updatedBy,
      deletedAt: user.deletedAt,
      isDeleted: user.isDeleted,
    }

    // Remove undefined properties
    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof Prisma.UserUpdateInput] === undefined) {
        delete updateData[key as keyof Prisma.UserUpdateInput]
      }
    })

    return updateData
  }
}
