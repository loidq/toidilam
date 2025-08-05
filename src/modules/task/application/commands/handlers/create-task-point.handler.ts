import { ForbiddenException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project'

import { TaskPointEntity } from '../../../domain/entities/task-point.entity'
import { TaskPointPrismaRepository } from '../../../infrastructure/repositories/task-point-prisma.repository'
import { CreateTaskPointCommand } from '../task-point.commands'

@CommandHandler(CreateTaskPointCommand)
export class CreateTaskPointCommandHandler implements ICommandHandler<CreateTaskPointCommand> {
  constructor(
    private readonly taskPointRepository: TaskPointPrismaRepository,

    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: CreateTaskPointCommand): Promise<TaskPointEntity> {
    const { point, projectId, icon } = command

    const project = await this.projectRepository.findById(projectId)
    if (!project || project.isArchived) {
      throw new ForbiddenException(`Project with ID not found`)
    }

    const taskPoint = TaskPointEntity.create({
      point,
      projectId,
      icon,
    })

    const savedTaskPoint = await this.taskPointRepository.create(taskPoint)

    return savedTaskPoint
  }
}
