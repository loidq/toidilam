import { Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { GetActivityByIdQuery } from '../activity.queries'

@Injectable()
@QueryHandler(GetActivityByIdQuery)
export class GetActivityByIdQueryHandler implements IQueryHandler<GetActivityByIdQuery> {
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(query: GetActivityByIdQuery): Promise<ActivityEntity> {
    const { activityId } = query

    const activity = await this.activityRepository.findById(activityId)

    if (!activity) {
      throw new NotFoundException('Activity not found')
    }

    return activity
  }
}
