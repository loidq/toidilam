import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskPointEntity } from '../../../domain/entities/task-point.entity'
import { TaskPointPrismaRepository } from '../../../infrastructure/repositories/task-point-prisma.repository'
import { GetTaskPointByIdQuery } from '../task-point.queries'

@QueryHandler(GetTaskPointByIdQuery)
export class GetTaskPointByIdQueryHandler implements IQueryHandler<GetTaskPointByIdQuery> {
  constructor(private readonly taskPointRepository: TaskPointPrismaRepository) {}

  async execute(query: GetTaskPointByIdQuery): Promise<TaskPointEntity> {
    const { taskPointId } = query

    const taskPoint = await this.taskPointRepository.findById(taskPointId)
    if (!taskPoint) {
      throw new NotFoundException(`TaskPoint with ID ${taskPointId} not found`)
    }

    return taskPoint
  }
}
