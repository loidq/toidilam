import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { CreateProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,

    @Inject('ORG_REPOSITORY')
    private readonly organizationRepository: IProjectRepository,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectEntity> {
    const { name, organizationId, createdBy, desc, cover, icon } = command
    const existingOrg = await this.organizationRepository.findById(organizationId)
    if (!existingOrg) {
      throw new NotFoundException('Organization not found')
    }

    const projectData = ProjectEntity.createProject({
      id: '',
      name,
      organizationId,
      createdBy,
      desc,
      cover,
      icon,
    })
    return await this.projectRepository.createProject(projectData)
  }
}
