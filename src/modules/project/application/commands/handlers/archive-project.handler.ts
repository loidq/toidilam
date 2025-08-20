import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project/domain/repositories/project.repository'

import { ArchiveProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(ArchiveProjectCommand)
export class ArchiveProjectCommandHandler implements ICommandHandler<ArchiveProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute({ projectId, archivedBy, isArchived }: ArchiveProjectCommand): Promise<boolean> {
    const existingProject = await this.projectRepository.findById(projectId)
    if (!existingProject || existingProject.isDeleted) {
      throw new NotFoundException('Project not found')
    }

    return await this.projectRepository.archive(projectId, {
      updatedBy: archivedBy,
      isArchived,
    })
  }
}
