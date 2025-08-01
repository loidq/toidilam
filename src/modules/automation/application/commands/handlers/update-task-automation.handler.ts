import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskAutomationEntity } from '../../../domain/entities/task-automation.entity'
import { TaskAutomationPrismaRepository } from '../../../infrastructure/repositories/task-automation-prisma.repository'
import { UpdateTaskAutomationCommand } from '../task-automation.commands'

@CommandHandler(UpdateTaskAutomationCommand)
export class UpdateTaskAutomationCommandHandler
  implements ICommandHandler<UpdateTaskAutomationCommand>
{
  constructor(private readonly taskAutomationRepository: TaskAutomationPrismaRepository) {}

  async execute(command: UpdateTaskAutomationCommand): Promise<TaskAutomationEntity> {
    const { taskAutomationId, updatedBy, when, then } = command

    const taskAutomation = await this.taskAutomationRepository.findById(taskAutomationId)
    if (!taskAutomation) {
      throw new NotFoundException(`TaskAutomation with ID ${taskAutomationId} not found`)
    }

    taskAutomation.update({
      when,
      then,
      updatedBy,
    })

    const updatedTaskAutomation = await this.taskAutomationRepository.update(
      taskAutomationId,
      taskAutomation,
    )

    return updatedTaskAutomation
  }
}
