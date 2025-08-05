import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskPointPrismaRepository } from '../../../infrastructure/repositories/task-point-prisma.repository'
import { DeleteTaskPointCommand } from '../task-point.commands'

@CommandHandler(DeleteTaskPointCommand)
export class DeleteTaskPointCommandHandler implements ICommandHandler<DeleteTaskPointCommand> {
  constructor(private readonly taskPointRepository: TaskPointPrismaRepository) {}

  async execute(command: DeleteTaskPointCommand): Promise<void> {
    const { taskPointId } = command

    const existingTaskPoint = await this.taskPointRepository.findById(taskPointId)
    if (!existingTaskPoint) {
      throw new NotFoundException(`TaskPoint with ID ${taskPointId} not found`)
    }

    await this.taskPointRepository.delete(taskPointId)
  }
}
