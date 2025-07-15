import { Project } from '@prisma/client'

import { ProjectEntity } from '../../domain/entities/project.entity'
import {
  ProjectCreateInput,
  ProjectUpdateInput,
} from './../../../../infrastructure/prisma/types/project-query-options.types'

export class ProjectMapper {
  static toDomain(prismaProject: Project): ProjectEntity {
    return new ProjectEntity({
      id: prismaProject.id,
      name: prismaProject.name,
      organizationId: prismaProject.organizationId,
      desc: prismaProject.desc || undefined,
      cover: prismaProject.cover || undefined,
      icon: prismaProject.icon || undefined,
      isArchived: prismaProject.isArchived,
      countMemberTask: prismaProject.countMemberTask,
      countProjectTask: prismaProject.countProjectTask,
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt,
      createdBy: prismaProject.createdBy || undefined,
      updatedBy: prismaProject.updatedBy || undefined,
    })
  }

  static toPrisma(projectEntity: ProjectEntity): Omit<Project, 'createdAt' | 'updatedAt'> {
    return {
      id: projectEntity.id,
      name: projectEntity.name,
      organizationId: projectEntity.organizationId,
      desc: projectEntity.desc || null,
      cover: projectEntity.cover || null,
      icon: projectEntity.icon || null,
      isArchived: projectEntity.isArchived,
      countMemberTask: projectEntity.countMemberTask,
      countProjectTask: projectEntity.countProjectTask,
      createdBy: projectEntity.createdBy || null,
      updatedBy: projectEntity.updatedBy || null,
    }
  }

  static toPrismaCreate(projectEntity: ProjectEntity): ProjectCreateInput {
    return {
      id: projectEntity.id,
      name: projectEntity.name,
      organization: {
        connect: { id: projectEntity.organizationId },
      },
      desc: projectEntity.desc,
      cover: projectEntity.cover,
      icon: projectEntity.icon,
      isArchived: projectEntity.isArchived,
      countMemberTask: projectEntity.countMemberTask,
      countProjectTask: projectEntity.countProjectTask,
      createdBy: projectEntity.createdBy,
    }
  }

  static toPrismaUpdate(projectEntity: ProjectEntity): ProjectUpdateInput {
    const updateData: ProjectUpdateInput = {
      name: projectEntity.name,
      desc: projectEntity.desc,
      cover: projectEntity.cover,
      icon: projectEntity.icon,
      isArchived: projectEntity.isArchived,
      countMemberTask: projectEntity.countMemberTask,
      countProjectTask: projectEntity.countProjectTask,
      updatedBy: projectEntity.updatedBy,
    }

    Object.keys(updateData).forEach(key => {
      if (updateData[key as keyof ProjectUpdateInput] === undefined) {
        delete updateData[key as keyof ProjectUpdateInput]
      }
    })
    return updateData
  }
}
