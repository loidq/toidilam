import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskAutomationPrismaRepository } from '../../../infrastructure/repositories/task-automation-prisma.repository'
import { DeleteTaskAutomationCommand } from '../task-automation.commands'

@CommandHandler(DeleteTaskAutomationCommand)
export class DeleteTaskAutomationCommandHandler
  implements ICommandHandler<DeleteTaskAutomationCommand>
{
  constructor(private readonly taskAutomationRepository: TaskAutomationPrismaRepository) {}

  async execute(command: DeleteTaskAutomationCommand): Promise<void> {
    const { taskAutomationId } = command

    const taskAutomation = await this.taskAutomationRepository.findById(taskAutomationId)
    if (!taskAutomation) {
      throw new NotFoundException(`TaskAutomation with ID ${taskAutomationId} not found`)
    }

    await this.taskAutomationRepository.delete(taskAutomationId)
  }
}
