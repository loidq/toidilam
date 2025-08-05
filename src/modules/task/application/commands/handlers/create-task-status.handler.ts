import { ForbiddenException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { CreateTaskStatusCommand } from '../task-status.commands'

@CommandHandler(CreateTaskStatusCommand)
export class CreateTaskStatusCommandHandler implements ICommandHandler<CreateTaskStatusCommand> {
  constructor(
    private readonly taskStatusRepository: TaskStatusPrismaRepository,

    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: CreateTaskStatusCommand): Promise<TaskStatusEntity> {
    const { name, color, order, projectId, type } = command

    const project = await this.projectRepository.findById(projectId)
    if (!project || project.isArchived) {
      throw new ForbiddenException(`Project with ID not found`)
    }

    const taskStatus = TaskStatusEntity.create({
      name,
      color,
      order,
      projectId,
      type,
    })

    const savedTaskStatus = await this.taskStatusRepository.create(taskStatus)

    return savedTaskStatus
  }
}
