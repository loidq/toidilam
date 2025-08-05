import { Injectable } from '@nestjs/common'
import { TaskChecklist as PrismaTaskChecklist } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TaskChecklistEntity } from '../../domain/entities/task-checklist.entity'

@Injectable()
export class TaskChecklistPrismaRepository
  extends BasePrismaRepository<
    TaskChecklistEntity,
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
  implements
    IBaseRepository<TaskChecklistEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskChecklist')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTaskChecklist: PrismaTaskChecklist): TaskChecklistEntity {
    return new TaskChecklistEntity({
      id: prismaTaskChecklist.id,
      title: prismaTaskChecklist.title,
      order: prismaTaskChecklist.order,
      taskId: prismaTaskChecklist.taskId,
      done: prismaTaskChecklist.done,
      doneAt: prismaTaskChecklist.doneAt || undefined,
    })
  }

  protected toPrismaCreate(data: TaskChecklistEntity): any {
    return {
      title: data.title,
      order: data.order,
      done: data.done,
      doneAt: data.doneAt,
      task: {
        connect: { id: data.taskId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskChecklistEntity): any {
    return {
      title: data.title,
      order: data.order,
      taskId: data.taskId,
      done: data.done,
      doneAt: data.doneAt,
    }
  }

  async findById(id: string, options?: any): Promise<TaskChecklistEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<TaskChecklistEntity | null> {
    return this.findFirst(options)
  }

  async findByTask(taskId: string, options?: any): Promise<TaskChecklistEntity[]> {
    return this.findMany({
      where: { taskId },
      orderBy: { order: 'asc' },
      ...options,
    })
  }
}
