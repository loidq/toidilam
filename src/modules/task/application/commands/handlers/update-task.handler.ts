import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'
import { TaskStatusPrismaRepository } from '@/modules/task/infrastructure/repositories/task-status-prisma.repository'

import { TaskEntity } from '../../../domain/entities/task.entity'
import { UpdateTaskCommand } from '../task.commands'

@Injectable()
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskCommandHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    private readonly taskRepository: TaskPrismaRepository,

    private readonly taskStatusRepository: TaskStatusPrismaRepository,
  ) {}

  async execute(command: UpdateTaskCommand): Promise<TaskEntity> {
    const {
      taskId,
      updatedBy,
      title,
      desc,
      dueDate,
      order,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      progress,
      done,
      taskPoint,
      customFields,
      cover,
      plannedStartDate,
      plannedDueDate,
      startDate,
    } = command

    // Find existing task
    const existingTask = await this.taskRepository.findById(taskId)
    if (!existingTask) {
      throw new NotFoundException('Task not found')
    }

    // Verify task status exists if provided
    if (taskStatusId) {
      const existingStatus = await this.taskStatusRepository.findById(taskStatusId)
      if (!existingStatus) {
        throw new NotFoundException('Task status not found')
      }
    }

    // Verify parent task exists if provided
    if (parentTaskId) {
      const existingParentTask = await this.taskRepository.findById(parentTaskId)
      if (!existingParentTask) {
        throw new NotFoundException('Parent task not found')
      }
    }

    // Update task
    existingTask.update({
      title,
      desc,
      dueDate,
      order,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      progress,
      done,
      taskPoint,
      customFields,
      updatedBy,
      cover,
      plannedStartDate,
      plannedDueDate,
      startDate,
    })

    const updatedTask = await this.taskRepository.update({ id: taskId }, existingTask)
    return updatedTask
  }
}
