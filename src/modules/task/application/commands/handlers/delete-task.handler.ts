import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskAssigneePrismaRepository } from '@/modules/task/infrastructure/repositories/task-assignee-prisma.repository'
import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'

import { DeleteTaskCommand } from '../task.commands'

@Injectable()
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskCommandHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    private readonly taskRepository: TaskPrismaRepository,
    private readonly taskAssigneeRepository: TaskAssigneePrismaRepository,
  ) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const { taskId } = command

    // Verify task exists
    const existingTask = await this.taskRepository.findById(taskId)
    if (!existingTask) {
      throw new NotFoundException('Task not found')
    }

    await this.taskRepository.delete({
      id: taskId,
    })
  }
}
