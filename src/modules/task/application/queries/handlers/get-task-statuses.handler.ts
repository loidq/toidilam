import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { GetTaskStatusesQuery } from '../task-status.queries'

@QueryHandler(GetTaskStatusesQuery)
export class GetTaskStatusesQueryHandler implements IQueryHandler<GetTaskStatusesQuery> {
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(query: GetTaskStatusesQuery): Promise<{
    taskStatuses: TaskStatusEntity[]
    total: number
  }> {
    const { projectId, page = 1, limit = 10 } = query

    const where: any = {}
    if (projectId) {
      where.projectId = projectId
    }

    const options = {
      where,
      orderBy: { order: 'asc' as const },
      skip: (page - 1) * limit,
      take: limit,
    }

    const [taskStatuses, total] = await Promise.all([
      this.taskStatusRepository.findMany(options),
      this.taskStatusRepository.count({ where }),
    ])

    return { taskStatuses, total }
  }
}
