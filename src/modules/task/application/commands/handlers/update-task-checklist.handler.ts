import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskChecklistEntity } from '../../../domain/entities/task-checklist.entity'
import { TaskChecklistPrismaRepository } from '../../../infrastructure/repositories/task-checklist-prisma.repository'
import { UpdateTaskChecklistCommand } from '../task-checklist.commands'

@CommandHandler(UpdateTaskChecklistCommand)
export class UpdateTaskChecklistCommandHandler
  implements ICommandHandler<UpdateTaskChecklistCommand>
{
  constructor(private readonly taskChecklistRepository: TaskChecklistPrismaRepository) {}

  async execute(command: UpdateTaskChecklistCommand): Promise<TaskChecklistEntity> {
    const { checklistId, title, order, done } = command

    const existingTaskChecklist = await this.taskChecklistRepository.findById(checklistId)
    if (!existingTaskChecklist) {
      throw new NotFoundException(`TaskChecklist with ID ${checklistId} not found`)
    }

    if (title !== undefined) {
      existingTaskChecklist.updateTitle(title)
    }

    if (order !== undefined) {
      existingTaskChecklist.updateOrder(order)
    }

    if (done !== undefined) {
      if (done) {
        existingTaskChecklist.markAsDone()
      } else {
        existingTaskChecklist.markAsUndone()
      }
    }

    const updatedTaskChecklist = await this.taskChecklistRepository.update(
      checklistId,
      existingTaskChecklist,
    )

    return updatedTaskChecklist
  }
}
