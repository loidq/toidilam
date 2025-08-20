import { Injectable } from '@nestjs/common'
import {
  Prisma,
  Organization as PrismaOrg,
  OrganizationMember as PrismaOrgMember,
} from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  OrgBaseQueryOptions,
  OrgCreateInput,
  OrgFindQueryOptions,
  OrgUpdateInput,
  OrgWhereUniqueInput,
} from '@/infrastructure/prisma/types/org-query-options.types'
import { OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

type PrismaOrgWithMembers = PrismaOrg & {
  organizationMembers: PrismaOrgMember[]
}
@Injectable()
export class OrgPrismaRepository
  extends BasePrismaRepository<
    OrgEntity,
    Prisma.OrganizationWhereInput,
    OrgWhereUniqueInput,
    OrgCreateInput,
    OrgUpdateInput,
    Prisma.OrganizationSelect,
    Prisma.OrganizationInclude,
    Prisma.OrganizationOrderByWithRelationInput,
    Prisma.OrganizationScalarFieldEnum,
    Prisma.OrganizationAggregateArgs
  >
  implements IOrgRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'organization')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaOrg: PrismaOrgWithMembers): OrgEntity {
    return new OrgEntity({
      id: prismaOrg.id,
      name: prismaOrg.name,
      slug: prismaOrg.slug,
      desc: prismaOrg.desc ?? undefined,
      cover: prismaOrg.cover ?? undefined,
      avatar: prismaOrg.avatar ?? undefined,
      maxStorageSize: prismaOrg.maxStorageSize ?? undefined,
      createdBy: prismaOrg.createdBy,
      updatedBy: prismaOrg.updatedBy ?? undefined,
      createdAt: prismaOrg.createdAt,
      updatedAt: prismaOrg.updatedAt ?? undefined,
      organizationMembers:
        prismaOrg.organizationMembers?.map(
          member =>
            new OrgMemberEntity({
              id: member.id,
              organizationId: member.organizationId,
              userId: member.userId,
              status: member.status as OrgMemberEntity['status'],
              role: member.role as OrgMemberEntity['role'],
              createdBy: member.createdBy,
              updatedBy: member.updatedBy ?? undefined,
              createdAt: member.createdAt,
              updatedAt: member.updatedAt ?? undefined,
            }),
        ) ?? [],
    })
  }

  protected toPrismaCreate(data: OrgEntity): OrgCreateInput {
    return {
      name: data.name,
      slug: data.slug,
      desc: data.desc,
      cover: data.cover,
      avatar: data.avatar,
      maxStorageSize: data.maxStorageSize,
      createdBy: data.createdBy,
      organizationMembers:
        data.organizationMembers.length > 0
          ? {
              create: data.organizationMembers.map(member => ({
                user: {
                  connect: { id: member.userId },
                },
                status: member.status,
                role: member.role,
                createdBy: member.createdBy,
              })),
            }
          : undefined,
    }
  }

  // Domain specific methods
  async findById(id: string, options?: OrgBaseQueryOptions): Promise<OrgEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findBySlug(slug: string, options?: OrgBaseQueryOptions): Promise<OrgEntity | null> {
    return this.findUnique({ slug }, options)
  }

  async findOne(options?: OrgFindQueryOptions): Promise<OrgEntity | null> {
    return this.findFirst(options)
  }

  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }

  async existsBySlug(slug: string): Promise<boolean> {
    return this.exists({ slug })
  }

  // Load organization với tất cả relationships
  async findByIdWithRelations(id: string): Promise<OrgEntity | null> {
    const org = await this.prismaService.organization.findUnique({
      where: { id },
      include: {
        organizationMembers: {
          include: {
            user: true,
          },
          orderBy: { createdAt: 'asc' },
        },
        projects: {
          where: { isDeleted: false },
          orderBy: { updatedAt: 'desc' },
        },
        favorites: {
          orderBy: { createdAt: 'desc' },
        },
        applications: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!org) return null
    return this.toDomain(org as PrismaOrgWithMembers)
  }

  async findByUser(userId: string, options?: OrgFindQueryOptions): Promise<OrgEntity[]> {
    return this.findMany({
      where: {
        organizationMembers: {
          some: { userId },
        },
      },
      orderBy: { updatedAt: 'desc' },
      ...options,
    })
  }
}
