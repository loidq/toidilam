import { Injectable } from '@nestjs/common'
import { TaskPoint as PrismaTaskPoint } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TaskPointEntity } from '../../domain/entities/task-point.entity'

@Injectable()
export class TaskPointPrismaRepository
  extends BasePrismaRepository<
    TaskPointEntity,
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
  implements IBaseRepository<TaskPointEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskPoint')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTaskPoint: PrismaTaskPoint): TaskPointEntity {
    return new TaskPointEntity({
      id: prismaTaskPoint.id,
      point: prismaTaskPoint.point,
      projectId: prismaTaskPoint.projectId,
      icon: prismaTaskPoint.icon || undefined,
    })
  }

  protected toPrismaCreate(data: TaskPointEntity): any {
    return {
      point: data.point,
      icon: data.icon,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskPointEntity): any {
    return {
      point: data.point,
      projectId: data.projectId,
      icon: data.icon,
    }
  }

  async findById(id: string, options?: any): Promise<TaskPointEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<TaskPointEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<TaskPointEntity[]> {
    return this.findMany({
      where: { projectId },
      orderBy: { point: 'asc' },
      ...options,
    })
  }
}
