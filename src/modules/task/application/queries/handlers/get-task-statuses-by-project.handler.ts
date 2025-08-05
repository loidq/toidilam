import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { GetTaskStatusesByProjectQuery } from '../task-status.queries'

@QueryHandler(GetTaskStatusesByProjectQuery)
export class GetTaskStatusesByProjectQueryHandler
  implements IQueryHandler<GetTaskStatusesByProjectQuery>
{
  constructor(private readonly taskStatusRepository: TaskStatusPrismaRepository) {}

  async execute(query: GetTaskStatusesByProjectQuery): Promise<TaskStatusEntity[]> {
    const { projectId } = query

    const taskStatuses = await this.taskStatusRepository.findMany({
      where: { projectId },
      orderBy: { order: 'asc' as const },
    })

    return taskStatuses
  }
}
