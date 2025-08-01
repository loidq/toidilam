import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { UpdateActivityCommand } from '../activity.commands'

@Injectable()
@CommandHandler(UpdateActivityCommand)
export class UpdateActivityCommandHandler implements ICommandHandler<UpdateActivityCommand> {
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(command: UpdateActivityCommand): Promise<ActivityEntity> {
    const { activityId, data, updatedBy } = command

    // Find existing activity
    const existingActivity = await this.activityRepository.findById(activityId)
    if (!existingActivity) {
      throw new NotFoundException('Activity not found')
    }

    // Update activity data
    existingActivity.update({ data, updatedBy })

    // Save updated activity
    const updatedActivity = await this.activityRepository.update(
      { id: activityId },
      existingActivity,
    )

    return updatedActivity
  }
}
