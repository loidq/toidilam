import { Injectable } from '@nestjs/common'
import { Prisma, ProjectView as PrismaProjectView } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ProjectViewAggregateQueryOptions,
  ProjectViewBaseQueryOptions,
  ProjectViewCountQueryOptions,
  ProjectViewCreateInput,
  ProjectViewFindQueryOptions,
  ProjectViewGroupByQueryOptions,
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

  // Implement IProjectViewRepository methods
  async findById(
    id: string,
    options?: ProjectViewBaseQueryOptions,
  ): Promise<ProjectViewEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findByProjectId(
    projectId: string,
    options?: ProjectViewFindQueryOptions,
  ): Promise<ProjectViewEntity[]> {
    return this.findMany({
      ...options,
      where: { projectId, ...options?.where },
      orderBy: options?.orderBy || { order: 'asc' },
    })
  }

  async findByProjectIdAndUserId(
    projectId: string,
    userId: string,
    onlyMe?: boolean,
    options?: ProjectViewFindQueryOptions,
  ): Promise<ProjectViewEntity[]> {
    const where: Prisma.ProjectViewWhereInput = {
      projectId,
      ...options?.where,
    }

    if (onlyMe) {
      where.AND = [{ onlyMe: true }, { createdBy: userId }]
    }

    return this.findMany({
      ...options,
      where,
      orderBy: options?.orderBy || { order: 'asc' },
    })
  }

  async create(data: ProjectViewEntity): Promise<ProjectViewEntity> {
    return super.create(data)
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

  async update(
    where: ProjectViewWhereUniqueInput,
    data: Partial<ProjectViewEntity>,
  ): Promise<ProjectViewEntity> {
    return await super.update(where, data)
  }

  async delete(where: ProjectViewWhereUniqueInput): Promise<boolean> {
    return super.delete(where)
  }

  // Add missing methods for interface compliance
  async findOne(options?: ProjectViewFindQueryOptions): Promise<ProjectViewEntity | null> {
    return this.findFirst(options)
  }

  async count(options?: ProjectViewCountQueryOptions): Promise<number> {
    return super.count(options)
  }

  async aggregate(options?: ProjectViewAggregateQueryOptions): Promise<any> {
    return super.aggregate({
      where: options?.where,
      orderBy: options?.orderBy,
      cursor: options?.cursor,
      take: options?.take,
      skip: options?.skip,
      _count: options?._count,
      _avg: options?._avg,
      _sum: options?._sum,
      _min: options?._min,
      _max: options?._max,
    })
  }

  async groupBy(options?: ProjectViewGroupByQueryOptions): Promise<any[]> {
    return super.groupBy({
      where: options?.where,
      by: options?.by || [],
      orderBy: options?.orderBy,
      having: options?.having,
      take: options?.take,
      skip: options?.skip,
      _count: options?._count,
      _avg: options?._avg,
      _sum: options?._sum,
      _min: options?._min,
      _max: options?._max,
    })
  }
}
