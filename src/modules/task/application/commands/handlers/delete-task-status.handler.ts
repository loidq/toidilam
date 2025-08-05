import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { DeleteTaskStatusCommand } from '../task-status.commands'

@CommandHandler(DeleteTaskStatusCommand)
export class DeleteTaskStatusCommandHandler implements ICommandHandler<DeleteTaskStatusCommand> {
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(command: DeleteTaskStatusCommand): Promise<void> {
    const { statusId } = command

    const existingTaskStatus = await this.taskStatusRepository.findById(statusId)
    if (!existingTaskStatus) {
      throw new NotFoundException(`TaskStatus with ID ${statusId} not found`)
    }

    await this.taskStatusRepository.delete({ id: statusId })
  }
}
