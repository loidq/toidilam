import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { UpdateProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler implements ICommandHandler<UpdateProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<ProjectEntity> {
    const {
      projectId,
      updatedBy,
      name,
      desc,
      cover,
      icon,
      isArchived,
      countMemberTask,
      countProjectTask,
    } = command

    const existingProject = await this.projectRepository.findById(projectId)
    if (!existingProject || existingProject.isDeleted) {
      throw new NotFoundException('Project not found')
    }

    existingProject.update(
      name,
      desc,
      cover,
      icon,
      isArchived,
      countMemberTask,
      countProjectTask,
      updatedBy,
    )

    return await this.projectRepository.update({ id: projectId }, existingProject)
  }
}
