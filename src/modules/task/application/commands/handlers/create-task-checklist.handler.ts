import { ForbiddenException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskChecklistEntity } from '../../../domain/entities/task-checklist.entity'
import { TaskChecklistPrismaRepository } from '../../../infrastructure/repositories/task-checklist-prisma.repository'
import { TaskPrismaRepository } from '../../../infrastructure/repositories/task-prisma.repository'
import { CreateTaskChecklistCommand } from '../task-checklist.commands'

@CommandHandler(CreateTaskChecklistCommand)
export class CreateTaskChecklistCommandHandler
  implements ICommandHandler<CreateTaskChecklistCommand>
{
  constructor(
    private readonly taskChecklistRepository: TaskChecklistPrismaRepository,
    private readonly taskRepository: TaskPrismaRepository,
  ) {}

  async execute(command: CreateTaskChecklistCommand): Promise<TaskChecklistEntity> {
    const { taskId, title, order } = command

    const task = await this.taskRepository.findById(taskId)
    if (!task) {
      throw new ForbiddenException(`Task with ID ${taskId} not found`)
    }

    const taskChecklist = TaskChecklistEntity.create({
      taskId,
      title,
      order,
    })

    const savedTaskChecklist = await this.taskChecklistRepository.create(taskChecklist)

    return savedTaskChecklist
  }
}
