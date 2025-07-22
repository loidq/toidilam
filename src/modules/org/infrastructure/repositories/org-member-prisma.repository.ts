import { Injectable } from '@nestjs/common'
import { Prisma, OrganizationMember as PrismaOrgMember } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  OrgMemberBaseQueryOptions,
  OrgMemberCreateInput,
  OrgMemberFindQueryOptions,
  OrgMemberUpdateInput,
  OrgMemberWhereUniqueInput,
} from '@/infrastructure/prisma/types/org-member-query-options.types'
import { OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'

@Injectable()
export class OrgMemberPrismaRepository
  extends BasePrismaRepository<
    OrgMemberEntity,
    Prisma.OrganizationMemberWhereInput,
    OrgMemberWhereUniqueInput,
    OrgMemberCreateInput,
    OrgMemberUpdateInput,
    Prisma.OrganizationMemberSelect,
    Prisma.OrganizationMemberInclude,
    Prisma.OrganizationMemberOrderByWithRelationInput,
    Prisma.OrganizationMemberScalarFieldEnum,
    Prisma.OrganizationMemberAggregateArgs
  >
  implements IOrgMemberRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'OrganizationMember')
  }

  // Implement abstract mapper methods
  protected toDomain(data: PrismaOrgMember): OrgMemberEntity {
    return new OrgMemberEntity({
      id: data.id,
      organizationId: data.organizationId,
      userId: data.userId,
      status: data.status as OrgMemberEntity['status'],
      role: data.role as OrgMemberEntity['role'],
      createdBy: data.createdBy,
      updatedBy: data.updatedBy ?? undefined,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  protected toPrismaCreate(data: OrgMemberEntity): OrgMemberCreateInput {
    return {
      user: {
        connect: { id: data.userId },
      },
      organization: {
        connect: { id: data.organizationId },
      },
      status: data.status,
      role: data.role,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    }
  }

  // Domain specific methods
  async findById(id: string, options?: OrgMemberBaseQueryOptions): Promise<OrgMemberEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity | null> {
    return this.findFirst(options)
  }

  async create(data: OrgMemberEntity): Promise<OrgMemberEntity> {
    return super.create(data)
  }

  async update(
    where: OrgMemberWhereUniqueInput,
    data: Partial<OrgMemberEntity>,
  ): Promise<OrgMemberEntity> {
    return super.update(where, data)
  }

  async softDelete(where: OrgMemberWhereUniqueInput): Promise<boolean> {
    return super.softDelete(where)
  }
  async delete(where: OrgMemberWhereUniqueInput): Promise<boolean> {
    return super.delete(where)
  }

  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }
}
