import { Injectable } from '@nestjs/common'
import { Prisma, Project as PrismaProject } from '@prisma/client'

import { BasePrismaRepository } from '@/infrastructure/prisma/base/base-prisma.repository'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ProjectBaseQueryOptions,
  ProjectCreateInput,
  ProjectFindQueryOptions,
  ProjectUpdateInput,
  ProjectWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-query-options.types'

import { ProjectEntity } from '../../domain/entities/project.entity'
import { IProjectRepository } from '../../domain/repositories/project.repository'
import { ProjectMapper } from '../mappers/project.mapper'

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
  protected toDomain(prismaProject: PrismaProject): ProjectEntity {
    return ProjectMapper.toDomain(prismaProject)
  }

  protected toPrismaCreate(project: Omit<ProjectEntity, 'id'>): ProjectCreateInput {
    return {
      name: project.name,
      desc: project.desc || null,
      cover: project.cover || null,
      icon: project.icon || null,
      isArchived: project.isArchived,
      countMemberTask: project.countMemberTask,
      countProjectTask: project.countProjectTask,
      createdBy: project.createdBy || '',
      organization: {
        connect: { id: project.organizationId },
      },
    }
  }

  protected toPrismaUpdate(project: ProjectEntity): ProjectUpdateInput {
    return {
      name: project.name,
      desc: project.desc || null,
      cover: project.cover || null,
      icon: project.icon || null,
      isArchived: project.isArchived,
      countMemberTask: project.countMemberTask,
      countProjectTask: project.countProjectTask,
      updatedBy: project.updatedBy || null,
    }
  }

  // Custom methods specific to project
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

  async findArchivedProjects(
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]> {
    return this.findMany({
      where: {
        organizationId,
        isArchived: true,
      },
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
        isArchived: false,
      },
      ...options,
    })
  }

  async createProject(project: ProjectEntity): Promise<ProjectEntity> {
    return this.create(this.toPrismaCreate(project))
  }

  async updateProject(project: ProjectEntity): Promise<ProjectEntity> {
    return this.update({ id: project.id }, this.toPrismaUpdate(project))
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.delete({ id })
  }

  async archiveProject(id: string, updatedBy: string): Promise<boolean> {
    try {
      await this.update(
        { id },
        {
          isArchived: true,
          updatedBy,
        },
      )
      return true
    } catch {
      return false
    }
  }

  async unarchiveProject(id: string, updatedBy: string): Promise<boolean> {
    try {
      await this.update(
        { id },
        {
          isArchived: false,
          updatedBy,
        },
      )
      return true
    } catch {
      return false
    }
  }

  async existsById(id: string): Promise<boolean> {
    return this.exists({ id })
  }

  async existsByName(name: string, organizationId: string): Promise<boolean> {
    return this.exists({ name, organizationId })
  }

  async countByOrganization(organizationId: string): Promise<number> {
    return this.count({ where: { organizationId } })
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

  async searchProjects(
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
