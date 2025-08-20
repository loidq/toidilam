import { Injectable } from '@nestjs/common'
import { DashboardComponent as PrismaDashboardComponent } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  DashboardComponentAggregateArgs,
  DashboardComponentBaseQueryOptions,
  DashboardComponentCreateInput,
  DashboardComponentCreateManyInput,
  DashboardComponentFindQueryOptions,
  DashboardComponentInclude,
  DashboardComponentOmit,
  DashboardComponentOrderByWithRelationInput,
  DashboardComponentScalarFieldEnum,
  DashboardComponentSelect,
  DashboardComponentUpdateInput,
  DashboardComponentWhereInput,
  DashboardComponentWhereUniqueInput,
} from '@/infrastructure/prisma/types/dashboard-component-query-options.types'

import { DashboardComponentEntity } from '../../domain/entities/dashboard-component.entity'

@Injectable()
export class DashboardComponentPrismaRepository
  extends BasePrismaRepository<
    DashboardComponentEntity,
    DashboardComponentWhereInput,
    DashboardComponentWhereUniqueInput,
    DashboardComponentCreateInput,
    DashboardComponentUpdateInput,
    DashboardComponentSelect,
    DashboardComponentInclude,
    DashboardComponentOrderByWithRelationInput,
    DashboardComponentScalarFieldEnum,
    DashboardComponentAggregateArgs,
    DashboardComponentOmit,
    DashboardComponentCreateManyInput
  >
  implements
    IBaseRepository<
      DashboardComponentEntity,
      DashboardComponentWhereInput,
      DashboardComponentWhereUniqueInput,
      DashboardComponentCreateInput,
      DashboardComponentUpdateInput,
      DashboardComponentSelect,
      DashboardComponentInclude,
      DashboardComponentOrderByWithRelationInput,
      DashboardComponentScalarFieldEnum,
      DashboardComponentAggregateArgs,
      DashboardComponentOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'dashboardComponent')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaComponent: PrismaDashboardComponent): DashboardComponentEntity {
    return new DashboardComponentEntity({
      id: prismaComponent.id,
      dashboardId: prismaComponent.dashboardId || undefined,
      title: prismaComponent.title || undefined,
      type: prismaComponent.type as any,
      config: prismaComponent.config ? (prismaComponent.config as any) : undefined,
      x: prismaComponent.x || 0,
      y: prismaComponent.y || 0,
      width: prismaComponent.width || 3,
      height: prismaComponent.height || 1,
      createdAt: prismaComponent.createdAt,
      createdBy: prismaComponent.createdBy,
      updatedAt: prismaComponent.updatedAt,
      updatedBy: prismaComponent.updatedBy || undefined,
    })
  }

  protected toPrismaCreate(data: DashboardComponentEntity): any {
    return {
      title: data.title,
      type: data.type,
      config: data.config,
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      createdBy: data.createdBy,
      dashboard: data.dashboardId
        ? {
            connect: { id: data.dashboardId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: DashboardComponentEntity): any {
    return {
      dashboardId: data.dashboardId,
      title: data.title,
      type: data.type,
      config: data.config,
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      createdBy: data.createdBy,
    }
  }

  async findById(
    id: string,
    options?: DashboardComponentBaseQueryOptions,
  ): Promise<DashboardComponentEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(
    options?: DashboardComponentFindQueryOptions,
  ): Promise<DashboardComponentEntity | null> {
    return this.findFirst(options)
  }
}
