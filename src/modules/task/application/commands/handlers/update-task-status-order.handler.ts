import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { UpdateTaskStatusOrderCommand } from '../task-status.commands'

@CommandHandler(UpdateTaskStatusOrderCommand)
export class UpdateTaskStatusOrderCommandHandler
  implements ICommandHandler<UpdateTaskStatusOrderCommand>
{
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(command: UpdateTaskStatusOrderCommand): Promise<TaskStatusEntity[]> {
    const { statusOrders } = command

    // Validate all statuses exist
    const statusIds = statusOrders.map(item => item.id)
    const existingStatuses = await Promise.all(
      statusIds.map(id => this.taskStatusRepository.findById(id)),
    )

    // Check if any status doesn't exist
    const missingStatusIndex = existingStatuses.findIndex(status => !status)
    if (missingStatusIndex >= 0) {
      throw new NotFoundException(`TaskStatus with ID ${statusIds[missingStatusIndex]} not found`)
    }

    // Update orders
    const updatePromises = statusOrders.map(async ({ id, order }) => {
      const status = existingStatuses.find(s => s!.id === id)!
      status.update({ order })
      return this.taskStatusRepository.update({ id }, status)
    })

    const updatedStatuses = await Promise.all(updatePromises)

    return updatedStatuses
  }
}
