import { Injectable } from '@nestjs/common'
import {
  Prisma,
  Member as PrismaMember,
  Project as PrismaProject,
  ProjectView as PrismaProjectView,
} from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ProjectBaseQueryOptions,
  ProjectCreateInput,
  ProjectFindQueryOptions,
  ProjectUpdateInput,
  ProjectWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-query-options.types'

import { MemberEntity } from '../../domain/entities/member.entity'
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
      members: PrismaMember[]
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
      members:
        prismaProject.members?.map(
          member =>
            new MemberEntity({
              id: member.id,
              userId: member.userId,
              projectId: member.projectId,
              role: member.role as MemberEntity['role'],
              createdAt: member.createdAt,
              updatedAt: member.updatedAt,
              createdBy: member.createdBy,
              updatedBy: member.updatedBy ?? undefined,
              isRemoved: member.isRemoved,
              removedAt: member.removedAt ?? undefined,
              removedBy: member.removedBy ?? undefined,
            }),
        ) ?? undefined,
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
      members: {
        create: data.members.map(member => ({
          userId: member.userId,
          role: member.role,
          createdBy: member.createdBy,
        })),
      },
    }
  }

  async findById(id: string, options?: ProjectBaseQueryOptions): Promise<ProjectEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: ProjectFindQueryOptions): Promise<ProjectEntity | null> {
    return this.findFirst(options)
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

  // Load project với tất cả relationships
  async findByIdWithRelations(id: string): Promise<ProjectEntity | null> {
    const project = await this.prismaService.project.findUnique({
      where: { id },
      include: {
        projectViews: {
          orderBy: { createdAt: 'asc' },
        },
        members: {
          include: {
            user: true,
          },
          orderBy: { createdAt: 'asc' },
        },
        tasks: {
          include: {
            taskStatus: true,
            taskAssignees: true,
          },
          orderBy: { order: 'asc' },
        },
        tags: {
          orderBy: { name: 'asc' },
        },
        grid: {
          orderBy: { createdAt: 'asc' },
        },
        field: {
          orderBy: { order: 'asc' },
        },
        dashboard: {
          include: {
            dashboardComponents: true,
          },
        },
        vision: true,
        comments: {
          orderBy: { createdAt: 'desc' },
        },
        fileStorages: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!project) return null

    // Basic mapping - chỉ map projectViews và members như hiện tại
    return this.toDomain(
      project as PrismaProject & {
        projectViews: PrismaProjectView[]
        members: PrismaMember[]
      },
    )
  }

  async findByOrganization(
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]> {
    return this.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      ...options,
    })
  }

  async findActiveProjects(
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]> {
    return this.findMany({
      where: {
        organizationId,
        isDeleted: false,
      },
      orderBy: { updatedAt: 'desc' },
      ...options,
    })
  }
}
