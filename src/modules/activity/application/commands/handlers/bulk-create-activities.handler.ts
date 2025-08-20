import { Injectable } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { BulkCreateActivitiesCommand } from '../activity.commands'

@Injectable()
@CommandHandler(BulkCreateActivitiesCommand)
export class BulkCreateActivitiesCommandHandler
  implements ICommandHandler<BulkCreateActivitiesCommand>
{
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(command: BulkCreateActivitiesCommand): Promise<ActivityEntity[]> {
    const { activities } = command

    // Create activity entities
    const activityEntities = activities.map(activityData => ActivityEntity.create(activityData))

    // Bulk save activities
    const savedActivities = await this.activityRepository.createMany(activityEntities)

    return savedActivities
  }
}
