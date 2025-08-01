import { Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'

import { TaskEntity } from '../../../domain/entities/task.entity'
import { GetTaskByIdQuery, GetTasksQuery } from '../task.queries'

@Injectable()
@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdQueryHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(private readonly taskRepository: TaskPrismaRepository) {}

  async execute({ taskId }: GetTaskByIdQuery): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(taskId, {
      include: {
        taskChecklists: true,
        taskAssignees: {
          select: {
            assignedAt: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        taskTags: true,
        taskStatus: true,
        parentTask: true,
        subTasks: true,
        project: true,
      },
    })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }
}

@Injectable()
@QueryHandler(GetTasksQuery)
export class GetTasksQueryHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly taskRepository: TaskPrismaRepository) {}

  async execute(query: GetTasksQuery): Promise<{ tasks: TaskEntity[]; total: number }> {
    const {
      projectId,
      assigneeId,
      statusId,
      parentTaskId,
      priority,
      type,
      done,
      search,
      dueDateFrom,
      dueDateTo,
      page = 1,
      limit = 20,
    } = query

    const where: any = {}

    if (projectId) {
      where.projectId = projectId
    }

    if (statusId) {
      where.taskStatusId = statusId
    }

    if (parentTaskId) {
      where.parentTaskId = parentTaskId
    }

    if (priority) {
      where.priority = priority
    }

    if (type) {
      where.type = type
    }

    if (done !== undefined) {
      where.done = done
    }

    if (assigneeId) {
      where.taskAssignees = {
        some: {
          userId: assigneeId,
        },
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { desc: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (dueDateFrom || dueDateTo) {
      where.dueDate = {}
      if (dueDateFrom) {
        where.dueDate.gte = dueDateFrom
      }
      if (dueDateTo) {
        where.dueDate.lte = dueDateTo
      }
    }

    const skip = (page - 1) * limit

    const [tasks, total] = await Promise.all([
      this.taskRepository.findMany({
        where,
        skip,
        take: limit,
        orderBy: { order: 'asc' },
        include: {
          taskChecklists: true,
          taskAssignees: true,
          taskTags: true,
          taskStatus: true,
        },
      }),
      this.taskRepository.count({ where }),
    ])

    return { tasks, total }
  }
}
