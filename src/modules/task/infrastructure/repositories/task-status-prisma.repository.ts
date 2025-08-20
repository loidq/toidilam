import { Injectable } from '@nestjs/common'
import { Task as PrismaTask, TaskStatus as PrismaTaskStatus } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  TaskStatusAggregateArgs,
  TaskStatusBaseQueryOptions,
  TaskStatusCreateInput,
  TaskStatusCreateManyInput,
  TaskStatusFindQueryOptions,
  TaskStatusInclude,
  TaskStatusOmit,
  TaskStatusOrderByWithRelationInput,
  TaskStatusScalarFieldEnum,
  TaskStatusSelect,
  TaskStatusUpdateInput,
  TaskStatusWhereInput,
  TaskStatusWhereUniqueInput,
} from '@/infrastructure/prisma/types/task-status-query-options.types'

import { TaskStatusEntity } from '../../domain/entities/task-status.entity'
import { TaskEntity } from '../../domain/entities/task.entity'
import { StatusType } from '../../domain/enums/status-type.enum'

@Injectable()
export class TaskStatusPrismaRepository
  extends BasePrismaRepository<
    TaskStatusEntity,
    TaskStatusWhereInput,
    TaskStatusWhereUniqueInput,
    TaskStatusCreateInput,
    TaskStatusUpdateInput,
    TaskStatusSelect,
    TaskStatusInclude,
    TaskStatusOrderByWithRelationInput,
    TaskStatusScalarFieldEnum,
    TaskStatusAggregateArgs,
    TaskStatusOmit,
    TaskStatusCreateManyInput
  >
  implements
    IBaseRepository<
      TaskStatusEntity,
      TaskStatusWhereInput,
      TaskStatusWhereUniqueInput,
      TaskStatusCreateInput,
      TaskStatusUpdateInput,
      TaskStatusSelect,
      TaskStatusInclude,
      TaskStatusOrderByWithRelationInput,
      TaskStatusScalarFieldEnum,
      TaskStatusAggregateArgs,
      TaskStatusOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskStatus')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaTaskStatus: PrismaTaskStatus & {
      tasks?: PrismaTask[]
    },
  ): TaskStatusEntity {
    return new TaskStatusEntity({
      id: prismaTaskStatus.id,
      name: prismaTaskStatus.name,
      color: prismaTaskStatus.color,
      order: prismaTaskStatus.order,
      projectId: prismaTaskStatus.projectId,
      type: prismaTaskStatus.type as StatusType,
      tasks:
        prismaTaskStatus.tasks?.map(
          task =>
            new TaskEntity({
              id: task.id,
              title: task.title,
              desc: task.desc ?? undefined,
              order: task.order,
              projectId: task.projectId,
              createdBy: task.createdBy,
              done: task.done,
            }),
        ) ?? [],
    })
  }

  protected toPrismaCreate(data: TaskStatusEntity): TaskStatusCreateInput {
    return {
      name: data.name,
      color: data.color,
      order: data.order,
      type: data.type,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskStatusEntity): TaskStatusCreateManyInput {
    return {
      name: data.name,
      color: data.color,
      order: data.order,
      projectId: data.projectId,
      type: data.type,
    }
  }

  async findById(
    id: string,
    options?: TaskStatusBaseQueryOptions,
  ): Promise<TaskStatusEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: TaskStatusFindQueryOptions): Promise<TaskStatusEntity | null> {
    return this.findFirst(options)
  }
}
