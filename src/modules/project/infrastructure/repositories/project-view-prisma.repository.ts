import { Injectable } from '@nestjs/common'
import { Prisma, ProjectView as PrismaProjectView } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ProjectViewBaseQueryOptions,
  ProjectViewCreateInput,
  ProjectViewFindQueryOptions,
  ProjectViewUpdateInput,
  ProjectViewWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-view-query-options.types'

import { ProjectViewEntity } from '../../domain/entities/project-view.entity'
import { IProjectViewRepository } from '../../domain/repositories/project-view.repository'

@Injectable()
export class ProjectViewPrismaRepository
  extends BasePrismaRepository<
    ProjectViewEntity,
    Prisma.ProjectViewWhereInput,
    ProjectViewWhereUniqueInput,
    ProjectViewCreateInput,
    ProjectViewUpdateInput,
    Prisma.ProjectViewSelect,
    Prisma.ProjectViewInclude,
    Prisma.ProjectViewOrderByWithRelationInput,
    Prisma.ProjectViewScalarFieldEnum,
    Prisma.ProjectViewAggregateArgs
  >
  implements IProjectViewRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'projectView')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaProjectView: PrismaProjectView): ProjectViewEntity {
    return new ProjectViewEntity({
      id: prismaProjectView.id,
      name: prismaProjectView.name ?? undefined,
      type: prismaProjectView.type as ProjectViewEntity['type'],
      onlyMe: prismaProjectView.onlyMe,
      icon: prismaProjectView.icon ?? undefined,
      projectId: prismaProjectView.projectId,
      order: prismaProjectView.order ?? undefined,
      data: prismaProjectView.data as ProjectViewEntity['data'],
      createdAt: prismaProjectView.createdAt,
      updatedAt: prismaProjectView.updatedAt,
      createdBy: prismaProjectView.createdBy,
      updatedBy: prismaProjectView.updatedBy ?? undefined,
    })
  }

  protected toPrismaCreate(projectView: ProjectViewEntity): ProjectViewCreateInput {
    return {
      name: projectView.name,
      type: projectView.type,
      onlyMe: projectView.onlyMe,
      icon: projectView.icon,
      project: {
        connect: { id: projectView.projectId },
      },

      order: projectView.order,
      data: projectView.data,
      createdBy: projectView.createdBy,
    }
  }

  protected toPrismaCreateManyInput(
    projectView: ProjectViewEntity,
  ): Prisma.ProjectViewCreateManyInput {
    return {
      name: projectView.name,
      type: projectView.type,
      onlyMe: projectView.onlyMe,
      icon: projectView.icon,
      projectId: projectView.projectId,
      order: projectView.order,
      data: projectView.data,
      createdBy: projectView.createdBy,
    }
  }

  // Implement IProjectViewRepository methods
  async findById(
    id: string,
    options?: ProjectViewBaseQueryOptions,
  ): Promise<ProjectViewEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: ProjectViewFindQueryOptions): Promise<ProjectViewEntity | null> {
    return this.findFirst(options)
  }

  async createMany(data: ProjectViewEntity[]): Promise<ProjectViewEntity[]> {
    await super.createMany(data)
    const createdViews = await this.findMany({
      where: {
        projectId: { in: data.map(view => view.projectId) },
      },
      orderBy: { order: 'asc' },
    })
    return createdViews
  }
}
