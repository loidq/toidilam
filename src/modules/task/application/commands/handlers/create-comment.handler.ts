import { Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '@/modules/activity/domain/entities/activity.entity'
import { ActivityTargetType } from '@/modules/activity/domain/enums/activity-target-type.enum'
import { ActivityType } from '@/modules/activity/domain/enums/activity-type.enum'
import { ActivityPrismaRepository } from '@/modules/activity/infrastructure/repositories/activity-prisma.repository'

import { CommentEntity } from '../../../domain/entities/comment.entity'
import { CommentPrismaRepository } from '../../../infrastructure/repositories/comment-prisma.repository'
import { TaskPrismaRepository } from '../../../infrastructure/repositories/task-prisma.repository'
import { CreateCommentCommand } from '../comment.commands'

@Injectable()
@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    private readonly commentRepository: CommentPrismaRepository,
    private readonly taskRepository: TaskPrismaRepository,
    private readonly activityRepository: ActivityPrismaRepository,
  ) {}

  async execute(command: CreateCommentCommand): Promise<CommentEntity> {
    const { taskId, content, createdBy, projectId } = command

    // Verify task exists
    const task = await this.taskRepository.findById(taskId)
    if (!task) {
      throw new NotFoundException('Task not found')
    }

    // Create comment entity
    const comment = CommentEntity.create({
      taskId,
      content,
      createdBy,
      projectId: projectId || task.projectId,
    })

    // Save comment
    const savedComment = await this.commentRepository.create(comment)

    // Create activity for comment creation
    const activity = ActivityEntity.create({
      createdBy,
      targetId: taskId,
      targetType: ActivityTargetType.TASK,
      type: ActivityType.TASK_COMMENT_CREATED,
      data: {
        commentId: savedComment.id,
        content: content.substring(0, 100), // Store preview
      },
    })
    await this.activityRepository.create(activity)

    return savedComment
  }
}
