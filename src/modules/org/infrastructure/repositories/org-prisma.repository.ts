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
import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { OrgMapper } from '../mappers/org.mapper'

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
    return OrgMapper.toDomain(prismaOrg)
  }

  protected toPrismaCreate(org: OrgEntity): OrgCreateInput {
    return OrgMapper.toPrismaCreate(org)
  }

  protected toPrismaUpdate(org: OrgEntity): OrgUpdateInput {
    return OrgMapper.toPrismaUpdate(org)
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

  async createOrg(org: OrgEntity): Promise<OrgEntity> {
    // Convert the OrgEntity to Prisma input format
    const prismaData = this.toPrismaCreate(org)
    return this.create(prismaData)
  }

  async updateOrg(org: OrgEntity): Promise<OrgEntity> {
    const prismaData = this.toPrismaUpdate(org)
    return this.update({ id: org.id }, prismaData)
  }

  async softDeleteOrg(id: string): Promise<boolean> {
    return this.softDelete({ id })
  }
  async deleteOrg(id: string): Promise<boolean> {
    return this.delete({ id })
  }

  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }

  async existsBySlug(slug: string): Promise<boolean> {
    return this.exists({ slug })
  }
}
