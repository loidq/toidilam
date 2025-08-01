import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { GetActivitiesQuery } from '../activity.queries'

@Injectable()
@QueryHandler(GetActivitiesQuery)
export class GetActivitiesQueryHandler implements IQueryHandler<GetActivitiesQuery> {
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(
    query: GetActivitiesQuery,
  ): Promise<{ activities: ActivityEntity[]; total: number }> {
    const {
      targetId,
      targetType,
      type,
      createdBy,
      search,
      includeData = true,
      page = 1,
      limit = 10,
    } = query

    const whereCondition: any = {}

    if (targetId) {
      whereCondition.targetId = targetId
    }

    if (targetType) {
      whereCondition.targetType = targetType
    }

    if (type) {
      whereCondition.type = type
    }

    if (createdBy) {
      whereCondition.createdBy = createdBy
    }

    if (search) {
      // Search trong data JSON hoặc type
      whereCondition.OR = [
        {
          type: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          data: {
            path: '$',
            string_contains: search,
          },
        },
      ]
    }

    const selectFields = includeData
      ? undefined
      : {
          id: true,
          targetId: true,
          targetType: true,
          type: true,
          createdAt: true,
          updatedAt: true,
          createdBy: true,
          updatedBy: true,
        }

    const [activities, total] = await Promise.all([
      this.activityRepository.findMany({
        where: whereCondition,
        select: selectFields,
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
