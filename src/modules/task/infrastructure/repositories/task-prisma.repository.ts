import { Injectable } from '@nestjs/common'
import {
  Comment as PrismaComment,
  FileStorage as PrismaFileStorage,
  Task as PrismaTask,
  TaskAssignee as PrismaTaskAssignee,
  TaskChecklist as PrismaTaskChecklist,
  TaskStatus as PrismaTaskStatus,
  TaskTag as PrismaTaskTag,
  Timer as PrismaTimer,
  User as PrismaUser,
} from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  TaskAggregateArgs,
  TaskBaseQueryOptions,
  TaskCreateInput,
  TaskCreateManyInput,
  TaskFindQueryOptions,
  TaskInclude,
  TaskOmit,
  TaskOrderByWithRelationInput,
  TaskScalarFieldEnum,
  TaskSelect,
  TaskUpdateInput,
  TaskWhereInput,
  TaskWhereUniqueInput,
} from '@/infrastructure/prisma/types/task-query-options.types'

import { FileStorageEntity } from '../../../storage/domain/entities/file-storage.entity'
import { CommentEntity } from '../../domain/entities/comment.entity'
import { TaskAssigneeEntity } from '../../domain/entities/task-assignee.entity'
import { TaskChecklistEntity } from '../../domain/entities/task-checklist.entity'
import { TaskStatusEntity } from '../../domain/entities/task-status.entity'
import { TaskTagEntity } from '../../domain/entities/task-tag.entity'
import { TaskEntity } from '../../domain/entities/task.entity'
import { TimerEntity } from '../../domain/entities/timer.entity'
import { StatusType } from '../../domain/enums/status-type.enum'
import { TaskPriority } from '../../domain/enums/task-priority.enum'
import { TaskType } from '../../domain/enums/task-type.enum'

@Injectable()
export class TaskPrismaRepository
  extends BasePrismaRepository<
    TaskEntity,
    TaskWhereInput,
    TaskWhereUniqueInput,
    TaskCreateInput,
    TaskUpdateInput,
    TaskSelect,
    TaskInclude,
    TaskOrderByWithRelationInput,
    TaskScalarFieldEnum,
    TaskAggregateArgs,
    TaskOmit,
    TaskCreateManyInput
  >
  implements
    IBaseRepository<
      TaskEntity,
      TaskWhereInput,
      TaskWhereUniqueInput,
      TaskCreateInput,
      TaskUpdateInput,
      TaskSelect,
      TaskInclude,
      TaskOrderByWithRelationInput,
      TaskScalarFieldEnum,
      TaskAggregateArgs,
      TaskOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'task')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaTask: PrismaTask & {
      taskChecklists?: PrismaTaskChecklist[]
      taskAssignees?: (PrismaTaskAssignee & { user?: PrismaUser })[]
      taskTags?: PrismaTaskTag[]
      taskStatus?: PrismaTaskStatus
      parentTask?: PrismaTask
      subTasks?: PrismaTask[]
      comments?: PrismaComment[]
      timers?: PrismaTimer[]
      fileStorages?: PrismaFileStorage[]
    },
  ): TaskEntity {
    console.log('toDomain', prismaTask)
    return new TaskEntity({
      id: prismaTask.id,
      title: prismaTask.title,
      desc: prismaTask.desc ?? undefined,
      dueDate: prismaTask.dueDate ?? undefined,
      order: prismaTask.order,
      type: (prismaTask.type as TaskType) ?? undefined,
      checklistDone: prismaTask.checklistDone ?? undefined,
      checklistTodos: prismaTask.checklistTodos ?? undefined,
      cover: prismaTask.cover ?? undefined,
      plannedStartDate: prismaTask.plannedStartDate ?? undefined,
      plannedDueDate: prismaTask.plannedDueDate ?? undefined,
      startDate: prismaTask.startDate ?? undefined,
      projectId: prismaTask.projectId,
      priority: (prismaTask.priority as TaskPriority) ?? undefined,
      taskStatusId: prismaTask.taskStatusId ?? undefined,
      parentTaskId: prismaTask.parentTaskId ?? undefined,
      progress: prismaTask.progress ?? undefined,
      done: prismaTask.done,
      taskPoint: prismaTask.taskPoint ?? undefined,
      customFields: (prismaTask.customFields as any) || {},
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
      createdBy: prismaTask.createdBy,
      updatedBy: prismaTask.updatedBy ?? undefined,
      taskChecklists:
        prismaTask.taskChecklists?.map(
          checklist =>
            new TaskChecklistEntity({
              id: checklist.id,
              title: checklist.title,
              order: checklist.order,
              taskId: checklist.taskId,
              done: checklist.done,
              doneAt: checklist.doneAt ?? undefined,
            }),
        ) ?? [],
      taskAssignees:
        prismaTask.taskAssignees?.map(
          assignee =>
            new TaskAssigneeEntity({
              taskId: assignee.taskId,
              userId: assignee.userId,
              assignedAt: assignee.assignedAt,
              user: assignee.user
                ? {
                    id: assignee.user.id,
                    name: assignee.user.name,
                    email: assignee.user.email,
                  }
                : undefined,
            }),
        ) ?? [],
      taskTags:
        prismaTask.taskTags?.map(
          tag =>
            new TaskTagEntity({
              taskId: tag.taskId,
              tagId: tag.tagId,
            }),
        ) ?? [],
      taskStatus: prismaTask.taskStatus
        ? new TaskStatusEntity({
            id: prismaTask.taskStatus.id,
            name: prismaTask.taskStatus.name,
            color: prismaTask.taskStatus.color,
            order: prismaTask.taskStatus.order,
            projectId: prismaTask.taskStatus.projectId,
            type: prismaTask.taskStatus.type as StatusType,
          })
        : undefined,
      parentTask: prismaTask.parentTask
        ? new TaskEntity({
            id: prismaTask.parentTask.id,
            title: prismaTask.parentTask.title,
            desc: prismaTask.parentTask.desc ?? undefined,
            order: prismaTask.parentTask.order,
            projectId: prismaTask.parentTask.projectId,
            createdBy: prismaTask.parentTask.createdBy,
            done: prismaTask.parentTask.done,
          })
        : undefined,
      subTasks:
        prismaTask.subTasks?.map(
          subTask =>
            new TaskEntity({
              id: subTask.id,
              title: subTask.title,
              desc: subTask.desc ?? undefined,
              order: subTask.order,
              projectId: subTask.projectId,
              createdBy: subTask.createdBy,
              done: subTask.done,
            }),
        ) ?? [],
      comments:
        prismaTask.comments?.map(
          comment =>
            new CommentEntity({
              id: comment.id,
              taskId: comment.taskId,
              content: comment.content,
              projectId: comment.projectId ?? undefined,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              createdBy: comment.createdBy,
              updatedBy: comment.updatedBy ?? undefined,
            }),
        ) ?? [],
      timers:
        prismaTask.timers?.map(
          timer =>
            new TimerEntity({
              id: timer.id,
              taskId: timer.taskId,
              userId: timer.userId,
              startTime: timer.startTime,
              endTime: timer.endTime ?? undefined,
              duration: timer.duration,
              createdAt: timer.createdAt,
              updatedAt: timer.updatedAt,
            }),
        ) ?? [],
      fileStorages:
        prismaTask.fileStorages?.map(
          fileStorage =>
            new FileStorageEntity({
              id: fileStorage.id,
              organizationId: fileStorage.organizationId ?? undefined,
              projectId: fileStorage.projectId ?? undefined,
              taskId: fileStorage.taskId ?? undefined,
              name: fileStorage.name,
              keyName: fileStorage.keyName,
              type: fileStorage.type as any,
              url: fileStorage.url ?? undefined,
              size: fileStorage.size ?? undefined,
              mimeType: fileStorage.mimeType ?? undefined,
              parentId: fileStorage.parentId ?? undefined,
              owner: fileStorage.owner ?? undefined,
              ownerType: fileStorage.ownerType as any,
              isDeleted: fileStorage.isDeleted,
              createdAt: fileStorage.createdAt,
              deletedAt: fileStorage.deletedAt ?? undefined,
              deletedBy: fileStorage.deletedBy ?? undefined,
              createdBy: fileStorage.createdBy,
            }),
        ) ?? [],
    })
  }

  protected toPrismaCreate(data: TaskEntity): TaskCreateInput {
    return {
      title: data.title,
      desc: data.desc,
      dueDate: data.dueDate,
      order: data.order,
      type: data.type,
      cover: data.cover,
      plannedStartDate: data.plannedStartDate,
      plannedDueDate: data.plannedDueDate,
      startDate: data.startDate,
      priority: data.priority,
      progress: data.progress,
      done: data.done,
      taskPoint: data.taskPoint,
      customFields: data.customFields,
      createdBy: data.createdBy,
      project: {
        connect: { id: data.projectId },
      },
      taskStatus: data.taskStatusId
        ? {
            connect: { id: data.taskStatusId },
          }
        : undefined,
      parentTask: data.parentTaskId
        ? {
            connect: { id: data.parentTaskId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: TaskEntity): TaskCreateManyInput {
    return {
      title: data.title,
      desc: data.desc,
      dueDate: data.dueDate,
      order: data.order,
      type: data.type,
      cover: data.cover,
      plannedStartDate: data.plannedStartDate,
      plannedDueDate: data.plannedDueDate,
      startDate: data.startDate,
      priority: data.priority,
      progress: data.progress,
      done: data.done,
      taskPoint: data.taskPoint,
      customFields: data.customFields,
      createdBy: data.createdBy,
      projectId: data.projectId,
      taskStatusId: data.taskStatusId ?? undefined,
      parentTaskId: data.parentTaskId ?? undefined,
    }
  }

  async findById(id: string, options?: TaskBaseQueryOptions): Promise<TaskEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: TaskFindQueryOptions): Promise<TaskEntity | null> {
    return this.findFirst(options)
  }

  // Load task với tất cả relationships
  async findByIdWithRelations(id: string): Promise<TaskEntity | null> {
    const task = await this.prismaService.task.findUnique({
      where: { id },
      include: {
        taskChecklists: {
          orderBy: { order: 'asc' },
        },
        taskAssignees: {
          include: {
            user: true,
          },
        },
        taskTags: {
          include: {
            tag: true,
          },
        },
        taskStatus: true,
        parentTask: true,
        subTasks: true,
        comments: {
          orderBy: { createdAt: 'desc' },
        },
        timers: {
          orderBy: { createdAt: 'desc' },
        },
        fileStorages: true,
      },
    })

    if (!task) return null
    return this.toDomain(
      task as PrismaTask & {
        taskChecklists?: PrismaTaskChecklist[]
        taskAssignees?: PrismaTaskAssignee[]
        taskTags?: PrismaTaskTag[]
        taskStatus?: PrismaTaskStatus
        parentTask?: PrismaTask
        subTasks?: PrismaTask[]
        comments?: PrismaComment[]
        timers?: PrismaTimer[]
        fileStorages?: PrismaFileStorage[]
      },
    )
  }

  async findByProject(projectId: string, options?: any): Promise<TaskEntity[]> {
    return this.findMany({
      where: { projectId },
      orderBy: { order: 'asc' },
      ...options,
    })
  }

  async findByStatus(taskStatusId: string, options?: any): Promise<TaskEntity[]> {
    return this.findMany({
      where: { taskStatusId },
      orderBy: { order: 'asc' },
      ...options,
    })
  }

  async findByAssignee(userId: string, options?: any): Promise<TaskEntity[]> {
    return this.findMany({
      where: {
        taskAssignees: {
          some: { userId },
        },
      },
      orderBy: { createdAt: 'desc' },
      ...options,
    })
  }
}
