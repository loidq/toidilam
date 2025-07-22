import { Injectable } from '@nestjs/common'
import { Prisma, Project as PrismaProject, ProjectView as PrismaProjectView } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ProjectBaseQueryOptions,
  ProjectCreateInput,
  ProjectFindQueryOptions,
  ProjectUpdateInput,
  ProjectWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-query-options.types'

import { ProjectViewEntity } from '../../domain/entities/project-view.entity'
import { ProjectEntity } from '../../domain/entities/project.entity'
import { IProjectRepository } from '../../domain/repositories/project.repository'
@Injectable()
export class ProjectPrismaRepository
  extends BasePrismaRepository<
    ProjectEntity,
    Prisma.ProjectWhereInput,
    ProjectWhereUniqueInput,
    ProjectCreateInput,
    ProjectUpdateInput,
    Prisma.ProjectSelect,
    Prisma.ProjectInclude,
    Prisma.ProjectOrderByWithRelationInput,
    Prisma.ProjectScalarFieldEnum,
    Prisma.ProjectAggregateArgs
  >
  implements IProjectRepository
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'project')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaProject: PrismaProject & {
      projectViews: PrismaProjectView[]
    },
  ): ProjectEntity {
    return new ProjectEntity({
      id: prismaProject.id,
      name: prismaProject.name,
      organizationId: prismaProject.organizationId,
      desc: prismaProject.desc ?? undefined,
      cover: prismaProject.cover ?? undefined,
      icon: prismaProject.icon ?? undefined,
      isArchived: prismaProject.isArchived,
      isDeleted: prismaProject.isDeleted,
      deletedAt: prismaProject.deletedAt ?? undefined,
      countMemberTask: prismaProject.countMemberTask,
      countProjectTask: prismaProject.countProjectTask,
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt,
      createdBy: prismaProject.createdBy,
      updatedBy: prismaProject.updatedBy ?? undefined,

      projectViews:
        prismaProject.projectViews?.map(
          view =>
            new ProjectViewEntity({
              id: view.id,
              name: view.name ?? undefined,
              type: view.type as ProjectViewEntity['type'],
              onlyMe: view.onlyMe,
              icon: view.icon ?? undefined,
              projectId: view.projectId,
              order: view.order ?? undefined,
              data: view.data as ProjectViewEntity['data'],
              createdAt: view.createdAt,
              updatedAt: view.updatedAt,
              createdBy: view.createdBy,
              updatedBy: view.updatedBy ?? undefined,
            }),
        ) ?? undefined,
    })
  }

  protected toPrismaCreate(data: ProjectEntity): ProjectCreateInput {
    return {
      name: data.name,
      desc: data.desc,
      cover: data.cover,
      icon: data.icon,
      isArchived: data.isArchived,
      countMemberTask: data.countMemberTask,
      countProjectTask: data.countProjectTask,
      createdBy: data.createdBy,
      organization: {
        connect: { id: data.organizationId },
      },
    }
  }

  async findById(id: string, options?: ProjectBaseQueryOptions): Promise<ProjectEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: ProjectFindQueryOptions): Promise<ProjectEntity | null> {
    return this.findFirst(options)
  }

  async findByName(
    name: string,
    organizationId: string,
    options?: ProjectBaseQueryOptions,
  ): Promise<ProjectEntity | null> {
    return this.findFirst({
      where: { name, organizationId },
      ...options,
    })
  }

  async findByOrganizationId(
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]> {
    return this.findMany({
      where: { organizationId },
      ...options,
    })
  }

  async create(data: ProjectEntity): Promise<ProjectEntity> {
    return super.create(data)
  }

  async update(
    where: ProjectWhereUniqueInput,
    data: Partial<ProjectEntity>,
  ): Promise<ProjectEntity> {
    return super.update(where, data)
  }

  async delete(where: ProjectWhereUniqueInput): Promise<boolean> {
    return super.delete(where)
  }

  async softDelete(where: ProjectWhereUniqueInput): Promise<boolean> {
    return super.softDelete(where)
  }
  async archive(
    projectId: string,
    data: {
      updatedBy: string
      isArchived: boolean
    },
  ): Promise<boolean> {
    try {
      await super.update(
        {
          id: projectId,
        },
        { isArchived: data.isArchived, updatedBy: data.updatedBy },
      )
      return true
    } catch {
      return false
    }
  }

  async existsById(projectId: string): Promise<boolean> {
    return this.exists({ id: projectId })
  }

  async existsByName(name: string, organizationId: string): Promise<boolean> {
    return this.exists({ name, organizationId })
  }

  async countByOrganization(
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<number> {
    return this.count({ where: { organizationId }, ...options })
  }

  async countArchivedByOrganization(organizationId: string): Promise<number> {
    return this.count({
      where: {
        organizationId,
        isArchived: true,
      },
    })
  }

  async hasUserAccess(projectId: string, userId: string): Promise<boolean> {
    const member = await this.model.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            userId,
          },
        },
      },
    })
    return !!member
  }

  async getUserProjectsByRole(userId: string, organizationId: string): Promise<ProjectEntity[]> {
    return this.findMany({
      where: {
        organizationId,
        members: {
          some: {
            userId,
          },
        },
      },
    })
  }

  async search(
    searchTerm: string,
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]> {
    return this.findMany({
      where: {
        organizationId,
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            desc: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      ...options,
    })
  }
}
