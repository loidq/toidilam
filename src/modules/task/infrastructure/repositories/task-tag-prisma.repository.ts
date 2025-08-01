import { Injectable } from '@nestjs/common'
import { TaskTag as PrismaTaskTag } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TaskTagEntity } from '../../domain/entities/task-tag.entity'

@Injectable()
export class TaskTagPrismaRepository
  extends BasePrismaRepository<
    TaskTagEntity,
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
  implements IBaseRepository<TaskTagEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskTag')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTaskTag: PrismaTaskTag): TaskTagEntity {
    return new TaskTagEntity({
      taskId: prismaTaskTag.taskId,
      tagId: prismaTaskTag.tagId,
    })
  }

  protected toPrismaCreate(data: TaskTagEntity): any {
    return {
      task: {
        connect: { id: data.taskId },
      },
      tag: {
        connect: { id: data.tagId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskTagEntity): any {
    return {
      taskId: data.taskId,
      tagId: data.tagId,
    }
  }

  async findByTask(taskId: string, options?: any): Promise<TaskTagEntity[]> {
    return this.findMany({ where: { taskId }, ...options })
  }

  async findByTag(tagId: string, options?: any): Promise<TaskTagEntity[]> {
    return this.findMany({ where: { tagId }, ...options })
  }

  async findByTaskAndTag(
    taskId: string,
    tagId: string,
    options?: any,
  ): Promise<TaskTagEntity | null> {
    return this.findFirst({ where: { taskId, tagId }, ...options })
  }

  async addTagToTask(taskId: string, tagId: string): Promise<TaskTagEntity> {
    const data = new TaskTagEntity({ taskId, tagId })
    return this.create(data)
  }

  async removeTagFromTask(taskId: string, tagId: string): Promise<boolean> {
    return this.delete({ taskId_tagId: { taskId, tagId } })
  }
}
