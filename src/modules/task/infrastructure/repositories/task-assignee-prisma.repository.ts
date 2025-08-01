import { Injectable } from '@nestjs/common'
import { TaskAssignee as PrismaTaskAssignee } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TaskAssigneeEntity } from '../../domain/entities/task-assignee.entity'

@Injectable()
export class TaskAssigneePrismaRepository
  extends BasePrismaRepository<
    TaskAssigneeEntity,
    any,
    any,
    any,
    any,
    any,
    never,
    any,
    any,
    any,
    any,
    any
  >
  implements IBaseRepository<TaskAssigneeEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskAssignee')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTaskAssignee: PrismaTaskAssignee): TaskAssigneeEntity {
    return new TaskAssigneeEntity({
      taskId: prismaTaskAssignee.taskId,
      userId: prismaTaskAssignee.userId,
      assignedAt: prismaTaskAssignee.assignedAt,
    })
  }

  protected toPrismaCreate(data: TaskAssigneeEntity): any {
    return {
      task: {
        connect: { id: data.taskId },
      },
      user: {
        connect: { id: data.userId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskAssigneeEntity): any {
    return {
      taskId: data.taskId,
      userId: data.userId,
    }
  }

  async findByTask(taskId: string, options?: any): Promise<TaskAssigneeEntity[]> {
    return this.findMany({ where: { taskId }, ...options })
  }

  async findByUser(userId: string, options?: any): Promise<TaskAssigneeEntity[]> {
    return this.findMany({ where: { userId }, ...options })
  }

  async findByTaskAndUser(
    taskId: string,
    userId: string,
    options?: any,
  ): Promise<TaskAssigneeEntity | null> {
    return this.findFirst({ where: { taskId, userId }, ...options })
  }
}
