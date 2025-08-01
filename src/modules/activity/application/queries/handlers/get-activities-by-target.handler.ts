import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { GetActivitiesByTargetQuery } from '../activity.queries'

@Injectable()
@QueryHandler(GetActivitiesByTargetQuery)
export class GetActivitiesByTargetQueryHandler
  implements IQueryHandler<GetActivitiesByTargetQuery>
{
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(
    query: GetActivitiesByTargetQuery,
  ): Promise<{ activities: ActivityEntity[]; total: number }> {
    const { targetId, targetType, page = 1, limit = 20 } = query

    const whereCondition = {
      targetId,
      targetType,
    }

    const [activities, total] = await Promise.all([
      this.activityRepository.findMany({
        where: whereCondition,
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.activityRepository.count({
        where: whereCondition,
      }),
    ])

    return { activities, total }
  }
}
