import { Injectable } from '@nestjs/common'
import { OrganizationStorage as PrismaOrganizationStorage } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

// OrganizationStorageEntity chưa có, tạm dùng any
type OrganizationStorageEntity = any

@Injectable()
export class OrganizationStoragePrismaRepository
  extends BasePrismaRepository<
    OrganizationStorageEntity,
    any,
    any,
    any,
    any,
    any,
    never,
    any,
    any,
    any,
    any,
    any
  >
  implements
    IBaseRepository<OrganizationStorageEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'organizationStorage')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaOrgStorage: PrismaOrganizationStorage): OrganizationStorageEntity {
    return {
      id: prismaOrgStorage.id,
      type: prismaOrgStorage.type,
      config: prismaOrgStorage.config,
      organizationId: prismaOrgStorage.organizationId,
      createdAt: prismaOrgStorage.createdAt,
      createdBy: prismaOrgStorage.createdBy || undefined,
      updatedAt: prismaOrgStorage.updatedAt,
      updatedBy: prismaOrgStorage.updatedBy || undefined,
    }
  }

  protected toPrismaCreate(data: OrganizationStorageEntity): any {
    return {
      type: data.type,
      config: data.config,
      organizationId: data.organizationId,
      createdBy: data.createdBy,
    }
  }

  protected toPrismaCreateManyInput(data: OrganizationStorageEntity): any {
    return {
      type: data.type,
      config: data.config,
      organizationId: data.organizationId,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<OrganizationStorageEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<OrganizationStorageEntity | null> {
    return this.findFirst(options)
  }

  async findByOrganization(
    organizationId: string,
    options?: any,
  ): Promise<OrganizationStorageEntity[]> {
    return this.findMany({ where: { organizationId }, ...options })
  }

  async findByType(type: string, options?: any): Promise<OrganizationStorageEntity[]> {
    return this.findMany({ where: { type }, ...options })
  }
}
