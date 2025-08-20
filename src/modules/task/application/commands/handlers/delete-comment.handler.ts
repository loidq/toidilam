import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '@/modules/activity/domain/entities/activity.entity'
import { ActivityTargetType } from '@/modules/activity/domain/enums/activity-target-type.enum'
import { ActivityType } from '@/modules/activity/domain/enums/activity-type.enum'
import { ActivityPrismaRepository } from '@/modules/activity/infrastructure/repositories/activity-prisma.repository'

import { CommentPrismaRepository } from '../../../infrastructure/repositories/comment-prisma.repository'
import { DeleteCommentCommand } from '../comment.commands'

@Injectable()
@CommandHandler(DeleteCommentCommand)
export class DeleteCommentCommandHandler implements ICommandHandler<DeleteCommentCommand> {
  constructor(
    private readonly commentRepository: CommentPrismaRepository,
    private readonly activityRepository: ActivityPrismaRepository,
  ) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    const { commentId, deletedBy } = command

    // Find existing comment
    const existingComment = await this.commentRepository.findById(commentId)
    if (!existingComment) {
      throw new NotFoundException('Comment not found')
    }

    // Delete comment (soft delete)
    await this.commentRepository.delete({ id: commentId })

    // Create activity for comment deletion
    const activity = ActivityEntity.create({
      createdBy: deletedBy,
      targetId: existingComment.taskId,
      targetType: ActivityTargetType.TASK,
      type: ActivityType.TASK_COMMENT_REMOVED,
      data: {
        commentId,
        deletedContent: existingComment.content.substring(0, 100),
      },
    })
    await this.activityRepository.create(activity)
  }
}
