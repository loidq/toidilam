import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { GetTaskStatusByIdQuery } from '../task-status.queries'

@QueryHandler(GetTaskStatusByIdQuery)
export class GetTaskStatusByIdQueryHandler implements IQueryHandler<GetTaskStatusByIdQuery> {
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(query: GetTaskStatusByIdQuery): Promise<TaskStatusEntity> {
    const { statusId } = query

    const taskStatus = await this.taskStatusRepository.findById(statusId)
    if (!taskStatus) {
      throw new NotFoundException(`TaskStatus with ID ${statusId} not found`)
    }

    return taskStatus
  }
}
