import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { DeleteProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(DeleteProjectCommand)
export class DeleteProjectCommandHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute({ projectId }: DeleteProjectCommand): Promise<boolean> {
    const existingProject = await this.projectRepository.findById(projectId)
    if (!existingProject || existingProject.isDeleted) {
      throw new NotFoundException('Project not found')
    }

    return await this.projectRepository.softDelete({ id: projectId })
  }
}
