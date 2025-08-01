import { ForbiddenException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { ActivityEntity } from '@/modules/activity/domain/entities/activity.entity'
import { ActivityTargetType } from '@/modules/activity/domain/enums/activity-target-type.enum'
import { ActivityType } from '@/modules/activity/domain/enums/activity-type.enum'
import { ActivityPrismaRepository } from '@/modules/activity/infrastructure/repositories/activity-prisma.repository'
import { IProjectRepository } from '@/modules/project'
import { TaskAssigneePrismaRepository } from '@/modules/task/infrastructure/repositories/task-assignee-prisma.repository'
import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'
import { TaskTagPrismaRepository } from '@/modules/task/infrastructure/repositories/task-tag-prisma.repository'

import { TaskEntity } from '../../../domain/entities/task.entity'
import { CreateTaskCommand } from '../task.commands'

@CommandHandler(CreateTaskCommand)
export class CreateTaskCommandHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly taskRepository: TaskPrismaRepository,

    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,

    private readonly taskAssigneeRepository: TaskAssigneePrismaRepository,
    private readonly taskTagRepository: TaskTagPrismaRepository,

    private readonly activityRepository: ActivityPrismaRepository,
  ) {}

  async execute(command: CreateTaskCommand): Promise<TaskEntity> {
    const {
      title,
      projectId,
      createdBy,
      order,
      desc,
      dueDate,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      taskPoint,
      customFields,
      assigneeIds,
      tagIds,
      plannedStartDate,
      plannedDueDate,
      startDate,
    } = command

    const project = await this.projectRepository.findById(projectId)
    if (!project || project.isArchived) {
      throw new ForbiddenException(`Project with ID not found`)
    }

    const task = TaskEntity.create({
      title,
      projectId,
      createdBy,
      order: order || 0,
      desc,
      dueDate,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      taskPoint,
      customFields,
      plannedStartDate,
      plannedDueDate,
      startDate,
    })

    const savedTask = await this.taskRepository.create(task)
    const taskId = savedTask.id!

    //Create activity for task creation
    const activity = ActivityEntity.create({
      createdBy,
      targetId: taskId,
      targetType: ActivityTargetType.TASK,
      type: ActivityType.TASK_CREATED,
    })
    await this.activityRepository.create(activity)

    // Handle assignees and tags if provided
    if (assigneeIds && assigneeIds.length > 0) {
      await this.taskAssigneeRepository.createMany(
        assigneeIds.map(userId => ({
          taskId,
          userId,
          assignedAt: new Date(),
        })),
      )
    }

    //TODO: Tag not implemented yet
    if (tagIds && tagIds.length > 0) {
      await this.taskTagRepository.createMany(
        tagIds.map(tagId => ({
          taskId,
          tagId,
        })),
      )
    }

    return savedTask
  }
}
