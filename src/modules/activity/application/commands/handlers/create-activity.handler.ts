import { Injectable } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '../../../domain/entities/activity.entity'
import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { CreateActivityCommand } from '../activity.commands'

@Injectable()
@CommandHandler(CreateActivityCommand)
export class CreateActivityCommandHandler implements ICommandHandler<CreateActivityCommand> {
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(command: CreateActivityCommand): Promise<ActivityEntity> {
    const { targetId, targetType, type, createdBy, data } = command

    // Create activity entity
    const activity = ActivityEntity.create({
      targetId,
      targetType,
      type,
      createdBy,
      data,
    })

    // Save activity
    const savedActivity = await this.activityRepository.create(activity)

    return savedActivity
  }
}
