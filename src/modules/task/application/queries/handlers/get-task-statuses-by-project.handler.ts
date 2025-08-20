import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskStatusEntity } from '../../../domain/entities/task-status.entity'
import { TaskStatusPrismaRepository } from '../../../infrastructure/repositories/task-status-prisma.repository'
import { TaskCacheService } from '../../services/task-cache.service'
import { GetTaskStatusesByProjectQuery } from '../task-status.queries'

@QueryHandler(GetTaskStatusesByProjectQuery)
export class GetTaskStatusesByProjectQueryHandler
  implements IQueryHandler<GetTaskStatusesByProjectQuery>
{
  constructor(
    private readonly taskStatusRepository: TaskStatusPrismaRepository,
    private readonly taskCacheService: TaskCacheService,
  ) {}

  async execute(query: GetTaskStatusesByProjectQuery): Promise<TaskStatusEntity[]> {
    const { projectId } = query

    // Try to get from cache first
    const cachedResult = await this.taskCacheService.getCachedTaskStatusList(projectId)
    if (cachedResult) {
      return cachedResult
    }

    // If not in cache, execute query
    const taskStatuses = await this.taskStatusRepository.findMany({
      where: { projectId },
      orderBy: { order: 'asc' as const },
    })

    // Cache the result
    await this.taskCacheService.cacheTaskStatusList(projectId, taskStatuses)

    return taskStatuses
  }
}
