import { Injectable } from '@nestjs/common'
import { Task as PrismaTask, Timer as PrismaTimer, User as PrismaUser } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  TimerAggregateArgs,
  TimerBaseQueryOptions,
  TimerCreateInput,
  TimerCreateManyInput,
  TimerFindQueryOptions,
  TimerInclude,
  TimerOmit,
  TimerOrderByWithRelationInput,
  TimerScalarFieldEnum,
  TimerSelect,
  TimerUpdateInput,
  TimerWhereInput,
  TimerWhereUniqueInput,
} from '@/infrastructure/prisma/types/timer-query-options.types'

import { UserEntity } from '../../../user/domain/entities/user.entity'
import { TaskEntity } from '../../domain/entities/task.entity'
import { TimerEntity } from '../../domain/entities/timer.entity'

@Injectable()
export class TimerPrismaRepository
  extends BasePrismaRepository<
    TimerEntity,
    TimerWhereInput,
    TimerWhereUniqueInput,
    TimerCreateInput,
    TimerUpdateInput,
    TimerSelect,
    TimerInclude,
    TimerOrderByWithRelationInput,
    TimerScalarFieldEnum,
    TimerAggregateArgs,
    TimerOmit,
    TimerCreateManyInput
  >
  implements
    IBaseRepository<
      TimerEntity,
      TimerWhereInput,
      TimerWhereUniqueInput,
      TimerCreateInput,
      TimerUpdateInput,
      TimerSelect,
      TimerInclude,
      TimerOrderByWithRelationInput,
      TimerScalarFieldEnum,
      TimerAggregateArgs,
      TimerOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'timer')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaTimer: PrismaTimer & {
      task?: PrismaTask
      user?: PrismaUser
    },
  ): TimerEntity {
    return new TimerEntity({
      id: prismaTimer.id,
      taskId: prismaTimer.taskId,
      userId: prismaTimer.userId,
      startTime: prismaTimer.startTime,
      endTime: prismaTimer.endTime ?? undefined,
      duration: prismaTimer.duration,
      createdAt: prismaTimer.createdAt,
      updatedAt: prismaTimer.updatedAt,
      task: prismaTimer.task
        ? new TaskEntity({
            id: prismaTimer.task.id,
            title: prismaTimer.task.title,
            desc: prismaTimer.task.desc ?? undefined,
            order: prismaTimer.task.order,
            projectId: prismaTimer.task.projectId,
            createdBy: prismaTimer.task.createdBy,
            done: prismaTimer.task.done,
          })
        : undefined,
      user: prismaTimer.user
        ? new UserEntity({
            id: prismaTimer.user.id,
            email: prismaTimer.user.email,
            password: prismaTimer.user.password,
            name: prismaTimer.user.name,
            status: prismaTimer.user.status as any,
          })
        : undefined,
    })
  }

  protected toPrismaCreate(data: TimerEntity): TimerCreateInput {
    return {
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      task: {
        connect: { id: data.taskId },
      },
      user: {
        connect: { id: data.userId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TimerEntity): TimerCreateManyInput {
    return {
      taskId: data.taskId,
      userId: data.userId,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
    }
  }

  async findById(id: string, options?: TimerBaseQueryOptions): Promise<TimerEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: TimerFindQueryOptions): Promise<TimerEntity | null> {
    return this.findFirst(options)
  }
}
