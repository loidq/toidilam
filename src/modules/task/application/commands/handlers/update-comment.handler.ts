import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '@/modules/activity/domain/entities/activity.entity'
import { ActivityTargetType } from '@/modules/activity/domain/enums/activity-target-type.enum'
import { ActivityType } from '@/modules/activity/domain/enums/activity-type.enum'
import { ActivityPrismaRepository } from '@/modules/activity/infrastructure/repositories/activity-prisma.repository'

import { CommentEntity } from '../../../domain/entities/comment.entity'
import { CommentPrismaRepository } from '../../../infrastructure/repositories/comment-prisma.repository'
import { UpdateCommentCommand } from '../comment.commands'

@Injectable()
@CommandHandler(UpdateCommentCommand)
export class UpdateCommentCommandHandler implements ICommandHandler<UpdateCommentCommand> {
  constructor(
    private readonly commentRepository: CommentPrismaRepository,
    private readonly activityRepository: ActivityPrismaRepository,
  ) {}

  async execute(command: UpdateCommentCommand): Promise<CommentEntity> {
    const { commentId, content, updatedBy } = command

    // Find existing comment
    const existingComment = await this.commentRepository.findById(commentId)
    if (!existingComment) {
      throw new NotFoundException('Comment not found')
    }

    // Update comment
    existingComment.update({ content, updatedBy })

    // Save updated comment
    const updatedComment = await this.commentRepository.update({ id: commentId }, existingComment)

    // Create activity for comment update
    const activity = ActivityEntity.create({
      createdBy: updatedBy,
      targetId: existingComment.taskId,
      targetType: ActivityTargetType.TASK,
      type: ActivityType.TASK_COMMENT_CHANGED,
      data: {
        commentId,
        newContent: content.substring(0, 100),
      },
    })
    await this.activityRepository.create(activity)

    return updatedComment
  }
}
