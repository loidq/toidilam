import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { ArchiveProjectCommand, UnarchiveProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(ArchiveProjectCommand)
export class ArchiveProjectHandler implements ICommandHandler<ArchiveProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: ArchiveProjectCommand): Promise<boolean> {
    const { id, archivedBy } = command

    const existingProject = await this.projectRepository.findById(id)
    if (!existingProject) {
      throw new NotFoundException('Project not found')
    }

    return await this.projectRepository.archiveProject(id, archivedBy)
  }
}

@Injectable()
@CommandHandler(UnarchiveProjectCommand)
export class UnarchiveProjectHandler implements ICommandHandler<UnarchiveProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: UnarchiveProjectCommand): Promise<boolean> {
    const { id, unarchivedBy } = command

    const existingProject = await this.projectRepository.findById(id)
    if (!existingProject) {
      throw new NotFoundException('Project not found')
    }

    return await this.projectRepository.unarchiveProject(id, unarchivedBy)
  }
}
