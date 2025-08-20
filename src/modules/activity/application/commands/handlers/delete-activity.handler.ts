import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityPrismaRepository } from '../../../infrastructure/repositories/activity-prisma.repository'
import { DeleteActivityCommand } from '../activity.commands'

@Injectable()
@CommandHandler(DeleteActivityCommand)
export class DeleteActivityCommandHandler implements ICommandHandler<DeleteActivityCommand> {
  constructor(private readonly activityRepository: ActivityPrismaRepository) {}

  async execute(command: DeleteActivityCommand): Promise<void> {
    const { activityId } = command

    // Find existing activity
    const existingActivity = await this.activityRepository.findById(activityId)
    if (!existingActivity) {
      throw new NotFoundException('Activity not found')
    }

    // Delete activity (hard delete as activities are usually logs)
    await this.activityRepository.delete({ id: activityId })
  }
}
