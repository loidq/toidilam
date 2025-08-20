import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskPointEntity } from '../../../domain/entities/task-point.entity'
import { TaskPointPrismaRepository } from '../../../infrastructure/repositories/task-point-prisma.repository'
import { UpdateTaskPointCommand } from '../task-point.commands'

@CommandHandler(UpdateTaskPointCommand)
export class UpdateTaskPointCommandHandler implements ICommandHandler<UpdateTaskPointCommand> {
  constructor(private readonly taskPointRepository: TaskPointPrismaRepository) {}

  async execute(command: UpdateTaskPointCommand): Promise<TaskPointEntity> {
    const { taskPointId, point, icon } = command

    const existingTaskPoint = await this.taskPointRepository.findById(taskPointId)
    if (!existingTaskPoint) {
      throw new NotFoundException(`TaskPoint with ID ${taskPointId} not found`)
    }

    existingTaskPoint.update({ point, icon })

    const updatedTaskPoint = await this.taskPointRepository.update(taskPointId, existingTaskPoint)

    return updatedTaskPoint
  }
}
