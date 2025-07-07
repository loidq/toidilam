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
} from '@/infrastructure/prisma/types/orgMember-query-options.types'
import { OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'

import { OrgMemberMapper } from '../mappers/orgMember.mapper'

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
  protected toDomain(prismaOrg: PrismaOrgMember): OrgMemberEntity {
    return OrgMemberMapper.toDomain(prismaOrg)
  }

  protected toPrismaCreate(org: OrgMemberEntity): OrgMemberCreateInput {
    return OrgMemberMapper.toPrismaCreate(org)
  }

  protected toPrismaUpdate(org: OrgMemberEntity): OrgMemberUpdateInput {
    return OrgMemberMapper.toPrismaUpdate(org)
  }

  // Domain specific methods
  async findById(id: string, options?: OrgMemberBaseQueryOptions): Promise<OrgMemberEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity | null> {
    return this.findFirst(options)
  }

  async createOrgMember(org: OrgMemberEntity): Promise<OrgMemberEntity> {
    const prismaData = this.toPrismaCreate(org)
    return this.create(prismaData)
  }

  async updateOrgMember(org: OrgMemberEntity): Promise<OrgMemberEntity> {
    const prismaData = this.toPrismaUpdate(org)
    return this.update({ id: org.id }, prismaData)
  }

  async softDeleteOrgMember(id: string): Promise<boolean> {
    return this.softDelete({ id })
  }
  async deleteOrgMember(id: string): Promise<boolean> {
    return this.delete({ id })
  }

  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }
}
