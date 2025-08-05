import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskChecklistPrismaRepository } from '../../../infrastructure/repositories/task-checklist-prisma.repository'
import { DeleteTaskChecklistCommand } from '../task-checklist.commands'

@CommandHandler(DeleteTaskChecklistCommand)
export class DeleteTaskChecklistCommandHandler
  implements ICommandHandler<DeleteTaskChecklistCommand>
{
  constructor(private readonly taskChecklistRepository: TaskChecklistPrismaRepository) {}

  async execute(command: DeleteTaskChecklistCommand): Promise<void> {
    const { checklistId } = command

    const existingTaskChecklist = await this.taskChecklistRepository.findById(checklistId)
    if (!existingTaskChecklist) {
      throw new NotFoundException(`TaskChecklist with ID ${checklistId} not found`)
    }

    await this.taskChecklistRepository.delete(checklistId)
  }
}
