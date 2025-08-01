import { Injectable } from '@nestjs/common'
import { Application as PrismaApplication } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

// ApplicationEntity chưa có, tạm dùng any
type ApplicationEntity = any

@Injectable()
export class ApplicationPrismaRepository
  extends BasePrismaRepository<
    ApplicationEntity,
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
  implements IBaseRepository<ApplicationEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'application')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaApplication: PrismaApplication): ApplicationEntity {
    return {
      id: prismaApplication.id,
      name: prismaApplication.name,
      description: prismaApplication.description || undefined,
      clientId: prismaApplication.clientId,
      clientSecret: prismaApplication.clientSecret,
      organizationId: prismaApplication.organizationId,
      scopes: prismaApplication.scopes,
      createdAt: prismaApplication.createdAt,
      createdBy: prismaApplication.createdBy,
      updatedAt: prismaApplication.updatedAt,
      updatedBy: prismaApplication.updatedBy || undefined,
    }
  }

  protected toPrismaCreate(data: ApplicationEntity): any {
    return {
      name: data.name,
      description: data.description,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      scopes: data.scopes,
      createdBy: data.createdBy,
      organization: {
        connect: { id: data.organizationId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: ApplicationEntity): any {
    return {
      name: data.name,
      description: data.description,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
      organizationId: data.organizationId,
      scopes: data.scopes,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<ApplicationEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<ApplicationEntity | null> {
    return this.findFirst(options)
  }

  async findByClientId(clientId: string, options?: any): Promise<ApplicationEntity | null> {
    return this.findUnique({ clientId }, options)
  }

  async findByOrganization(organizationId: string, options?: any): Promise<ApplicationEntity[]> {
    return this.findMany({ where: { organizationId }, ...options })
  }
}
