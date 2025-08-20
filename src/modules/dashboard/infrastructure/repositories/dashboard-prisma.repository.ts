import { Injectable } from '@nestjs/common'
import {
  Dashboard as PrismaDashboard,
  DashboardComponent as PrismaDashboardComponent,
  Project as PrismaProject,
} from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  DashboardAggregateArgs,
  DashboardBaseQueryOptions,
  DashboardCreateInput,
  DashboardCreateManyInput,
  DashboardFindQueryOptions,
  DashboardInclude,
  DashboardOmit,
  DashboardOrderByWithRelationInput,
  DashboardScalarFieldEnum,
  DashboardSelect,
  DashboardUpdateInput,
  DashboardWhereInput,
  DashboardWhereUniqueInput,
} from '@/infrastructure/prisma/types/dashboard-query-options.types'

import { ProjectEntity } from '../../../project/domain/entities/project.entity'
import { DashboardComponentEntity } from '../../domain/entities/dashboard-component.entity'
import { DashboardEntity } from '../../domain/entities/dashboard.entity'
import { DashboardComponentType } from '../../domain/enums/dashboard-component-type.enum'

@Injectable()
export class DashboardPrismaRepository
  extends BasePrismaRepository<
    DashboardEntity,
    DashboardWhereInput,
    DashboardWhereUniqueInput,
    DashboardCreateInput,
    DashboardUpdateInput,
    DashboardSelect,
    DashboardInclude,
    DashboardOrderByWithRelationInput,
    DashboardScalarFieldEnum,
    DashboardAggregateArgs,
    DashboardOmit,
    DashboardCreateManyInput
  >
  implements
    IBaseRepository<
      DashboardEntity,
      DashboardWhereInput,
      DashboardWhereUniqueInput,
      DashboardCreateInput,
      DashboardUpdateInput,
      DashboardSelect,
      DashboardInclude,
      DashboardOrderByWithRelationInput,
      DashboardScalarFieldEnum,
      DashboardAggregateArgs,
      DashboardOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'dashboard')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaDashboard: PrismaDashboard & {
      dashboardComponents?: PrismaDashboardComponent[]
      project?: PrismaProject
    },
  ): DashboardEntity {
    return new DashboardEntity({
      id: prismaDashboard.id,
      title: prismaDashboard.title ?? undefined,
      projectId: prismaDashboard.projectId,
      isDefault: prismaDashboard.isDefault,
      dashboardComponents:
        prismaDashboard.dashboardComponents?.map(
          component =>
            new DashboardComponentEntity({
              id: component.id,
              dashboardId: component.dashboardId ?? undefined,
              title: component.title ?? undefined,
              type: component.type as DashboardComponentType,
              config: (component.config as any) || {},
              x: component.x ?? undefined,
              y: component.y ?? undefined,
              width: component.width ?? undefined,
              height: component.height ?? undefined,
              createdAt: component.createdAt,
              createdBy: component.createdBy,
              updatedAt: component.updatedAt,
              updatedBy: component.updatedBy ?? undefined,
            }),
        ) ?? [],
      project: prismaDashboard.project
        ? new ProjectEntity({
            id: prismaDashboard.project.id,
            name: prismaDashboard.project.name,
            organizationId: prismaDashboard.project.organizationId,
            createdBy: prismaDashboard.project.createdBy,
            isArchived: prismaDashboard.project.isArchived,
            countMemberTask: prismaDashboard.project.countMemberTask,
            countProjectTask: prismaDashboard.project.countProjectTask,
          })
        : undefined,
    })
  }

  protected toPrismaCreate(data: DashboardEntity): DashboardCreateInput {
    return {
      title: data.title,
      isDefault: data.isDefault,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: DashboardEntity): DashboardCreateManyInput {
    return {
      title: data.title,
      projectId: data.projectId,
      isDefault: data.isDefault,
    }
  }

  async findById(id: string, options?: DashboardBaseQueryOptions): Promise<DashboardEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: DashboardFindQueryOptions): Promise<DashboardEntity | null> {
    return this.findFirst(options)
  }
}
