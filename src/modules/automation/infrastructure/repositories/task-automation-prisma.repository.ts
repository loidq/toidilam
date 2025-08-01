import { Injectable } from '@nestjs/common'
import { TaskAutomation as PrismaTaskAutomation } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TaskAutomationEntity } from '../../domain/entities/task-automation.entity'

@Injectable()
export class TaskAutomationPrismaRepository
  extends BasePrismaRepository<
    TaskAutomationEntity,
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
    IBaseRepository<TaskAutomationEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'taskAutomation')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTaskAutomation: PrismaTaskAutomation): TaskAutomationEntity {
    return new TaskAutomationEntity({
      id: prismaTaskAutomation.id,
      organizationId: prismaTaskAutomation.organizationId,
      projectId: prismaTaskAutomation.projectId,
      when: prismaTaskAutomation.when as any,
      then: prismaTaskAutomation.then as any,
      createdAt: prismaTaskAutomation.createdAt,
      createdBy: prismaTaskAutomation.createdBy,
      updatedAt: prismaTaskAutomation.updatedAt,
      updatedBy: prismaTaskAutomation.updatedBy || undefined,
    })
  }

  protected toPrismaCreate(data: TaskAutomationEntity): any {
    return {
      when: data.when,
      then: data.then,
      createdBy: data.createdBy,
      organization: {
        connect: { id: data.organizationId },
      },
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TaskAutomationEntity): any {
    return {
      organizationId: data.organizationId,
      projectId: data.projectId,
      when: data.when,
      then: data.then,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<TaskAutomationEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<TaskAutomationEntity | null> {
    return this.findFirst(options)
  }
}
