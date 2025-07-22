import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ProjectViewEntity } from '@/modules/project/domain/entities/project-view.entity'
import { IProjectViewRepository } from '@/modules/project/domain/repositories/project-view.repository'

import {
  CreateProjectViewCommand,
  DeleteProjectViewCommand,
  UpdateProjectViewCommand,
} from '../project-view.commands'

@Injectable()
@CommandHandler(CreateProjectViewCommand)
export class CreateProjectViewCommandHandler implements ICommandHandler<CreateProjectViewCommand> {
  constructor(
    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,
  ) {}

  async execute(command: CreateProjectViewCommand): Promise<ProjectViewEntity> {
    const { name, type, onlyMe, icon, projectId, order, data, createdBy } = command
    const projectView = ProjectViewEntity.create({
      name,
      type,
      onlyMe,
      icon,
      projectId,
      order,
      data,
      createdBy,
    })

    return await this.projectViewRepository.create(projectView)
  }
}

@Injectable()
@CommandHandler(UpdateProjectViewCommand)
export class UpdateProjectViewCommandHandler implements ICommandHandler<UpdateProjectViewCommand> {
  constructor(
    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,
  ) {}

  async execute(command: UpdateProjectViewCommand): Promise<ProjectViewEntity> {
    const { projectViewId, name, type, onlyMe, icon, order, data, updatedBy } = command
    const projectView = await this.projectViewRepository.findById(projectViewId)
    if (!projectView) {
      throw new NotFoundException('Project view not found')
    }

    projectView.update({
      name,
      type,
      onlyMe,
      icon,
      order,
      data,
      updatedBy,
    })

    return await this.projectViewRepository.update(
      {
        id: projectViewId,
      },
      projectView,
    )
  }
}

@Injectable()
@CommandHandler(DeleteProjectViewCommand)
export class DeleteProjectViewCommandHandler implements ICommandHandler<DeleteProjectViewCommand> {
  constructor(
    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,
  ) {}

  async execute({ projectViewId }: DeleteProjectViewCommand): Promise<void> {
    await this.projectViewRepository.softDelete({
      id: projectViewId,
    })
  }
}
