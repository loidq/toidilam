import { Project } from '@prisma/client'

import { ProjectEntity } from '../../domain/entities/project.entity'

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
      createdBy: prismaProject.createdBy,
      updatedBy: prismaProject.updatedBy || undefined,
    })
  }
}
