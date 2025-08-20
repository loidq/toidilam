import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { UpdateTaskStatusCommand } from '../task-status.commands'

@CommandHandler(UpdateTaskStatusCommand)
export class UpdateTaskStatusCommandHandler implements ICommandHandler<UpdateTaskStatusCommand> {
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(command: UpdateTaskStatusCommand): Promise<TaskStatusEntity> {
    const { statusId, name, color, order, type } = command

    const existingTaskStatus = await this.taskStatusRepository.findById(statusId)
    if (!existingTaskStatus) {
      throw new NotFoundException(`TaskStatus with ID ${statusId} not found`)
    }

    existingTaskStatus.update({ name, color, order, type })

    const updatedTaskStatus = await this.taskStatusRepository.update(
      { id: statusId },
      existingTaskStatus,
    )

    return updatedTaskStatus
  }
}
