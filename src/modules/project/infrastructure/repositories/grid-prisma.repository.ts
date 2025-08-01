import { Injectable } from '@nestjs/common'
import { Grid as PrismaGrid } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { GridEntity } from '../../domain/entities/grid.entity'

@Injectable()
export class GridPrismaRepository
  extends BasePrismaRepository<GridEntity, any, any, any, any, any, never, any, any, any, any, any>
  implements IBaseRepository<GridEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'grid')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaGrid: PrismaGrid): GridEntity {
    return new GridEntity({
      id: prismaGrid.id,
      title: prismaGrid.title,
      cover: prismaGrid.cover || undefined,
      projectId: prismaGrid.projectId,
      customFields: prismaGrid.customFields ? (prismaGrid.customFields as any) : undefined,
      isDeleted: prismaGrid.isDeleted,
      createdAt: prismaGrid.createdAt,
      createdBy: prismaGrid.createdBy,
      updatedAt: prismaGrid.updatedAt,
      updatedBy: prismaGrid.updatedBy || undefined,
    })
  }

  protected toPrismaCreate(data: GridEntity): any {
    return {
      title: data.title,
      cover: data.cover,
      customFields: data.customFields,
      isDeleted: data.isDeleted || false,
      createdBy: data.createdBy,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: GridEntity): any {
    return {
      title: data.title,
      cover: data.cover,
      projectId: data.projectId,
      customFields: data.customFields,
      isDeleted: data.isDeleted || false,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<GridEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<GridEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<GridEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }
}
