import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskPointEntity } from '../../../domain/entities/task-point.entity'
import { TaskPointPrismaRepository } from '../../../infrastructure/repositories/task-point-prisma.repository'
import { GetTaskPointsQuery } from '../task-point.queries'

@QueryHandler(GetTaskPointsQuery)
export class GetTaskPointsQueryHandler implements IQueryHandler<GetTaskPointsQuery> {
  constructor(private readonly taskPointRepository: TaskPointPrismaRepository) {}

  async execute(query: GetTaskPointsQuery): Promise<{
    taskPoints: TaskPointEntity[]
    total: number
  }> {
    const { projectId, page = 1, limit = 10 } = query

    const where: any = {}
    if (projectId) {
      where.projectId = projectId
    }

    const options = {
      where,
      orderBy: { point: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    }

    const [taskPoints, total] = await Promise.all([
      this.taskPointRepository.findMany(options),
      this.taskPointRepository.count({ where }),
    ])

    return { taskPoints, total }
  }
}
