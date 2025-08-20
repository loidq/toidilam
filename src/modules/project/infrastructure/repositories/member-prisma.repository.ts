import { Injectable } from '@nestjs/common'
import { Prisma, Member as PrismaMember } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  MemberBaseQueryOptions,
  MemberCreateInput,
  MemberFindQueryOptions,
  MemberUpdateInput,
  MemberWhereUniqueInput,
} from '@/infrastructure/prisma/types/member-query-options.types'

import { MemberEntity } from '../../domain/entities/member.entity'
import { MemberRole } from '../../domain/enums/member.enum'
import { IMemberRepository } from '../../domain/repositories/member.repository'

@Injectable()
export class MemberPrismaRepository
  extends BasePrismaRepository<
    MemberEntity,
    Prisma.MemberWhereInput,
    MemberWhereUniqueInput,
    MemberCreateInput,
    MemberUpdateInput,
    Prisma.MemberSelect,
    Prisma.MemberInclude,
    Prisma.MemberOrderByWithRelationInput,
    Prisma.MemberScalarFieldEnum,
    Prisma.MemberAggregateArgs
  >
  implements IMemberRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'member')
  }

  protected toDomain(prismaMember: PrismaMember): MemberEntity {
    return new MemberEntity({
      id: prismaMember.id,
      projectId: prismaMember.projectId,
      userId: prismaMember.userId,
      role: prismaMember.role as MemberRole,
      isRemoved: prismaMember.isRemoved,
      removedAt: prismaMember.removedAt ?? undefined,
      createdBy: prismaMember.createdBy,
      createdAt: prismaMember.createdAt,
      updatedAt: prismaMember.updatedAt,
      updatedBy: prismaMember.updatedBy ?? undefined,
    })
  }

  protected toPrismaCreate(data: MemberEntity): MemberCreateInput {
    return {
      role: data.role,
      isRemoved: data.isRemoved,
      removedAt: data.removedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      project: {
        connect: { id: data.projectId },
      },
      user: {
        connect: { id: data.userId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: MemberEntity): Prisma.MemberCreateManyInput {
    return {
      role: data.role,
      isRemoved: data.isRemoved,
      removedAt: data.removedAt,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      projectId: data.projectId,
      userId: data.userId,
    }
  }

  protected toPrismaUpdate(data: Partial<MemberEntity>): Partial<MemberUpdateInput> {
    return {
      ...(data.role && { role: data.role }),
      ...(data.updatedBy && { updatedBy: data.updatedBy }),
      ...(data.isRemoved !== undefined && { isRemoved: data.isRemoved }),
      ...(data.removedAt && { removedAt: data.removedAt }),
      ...(data.removedBy && { removedBy: data.removedBy }),
    }
  }

  // Base CRUD operations
  async findById(id: string, options?: MemberBaseQueryOptions): Promise<MemberEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: MemberFindQueryOptions): Promise<MemberEntity | null> {
    return this.findFirst(options)
  }

  // Existence checks
  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }

  async restore(where: MemberWhereUniqueInput, restoredBy: string): Promise<MemberEntity> {
    return this.update(where, {
      isRemoved: false,
      removedAt: undefined,
      updatedBy: restoredBy,
    } as Partial<MemberEntity>)
  }

  // Custom member operations
  async removeMember(where: MemberWhereUniqueInput, removedBy: string): Promise<MemberEntity> {
    return this.update(where, {
      isRemoved: true,
      removedAt: new Date(),
      removedBy,
    } as Partial<MemberEntity>)
  }
}
