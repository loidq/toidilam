import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { DeleteProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: DeleteProjectCommand): Promise<boolean> {
    const { id } = command

    const existingProject = await this.projectRepository.findById(id)
    if (!existingProject) {
      throw new NotFoundException('Project not found')
    }

    return await this.projectRepository.deleteProject(id)
  }
}
