import { Injectable } from '@nestjs/common'
import { Scheduler as PrismaScheduler } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

// SchedulerEntity chưa có, tạm dùng any
type SchedulerEntity = any

@Injectable()
export class SchedulerPrismaRepository
  extends BasePrismaRepository<
    SchedulerEntity,
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
  implements IBaseRepository<SchedulerEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'scheduler')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaScheduler: PrismaScheduler): SchedulerEntity {
    return {
      id: prismaScheduler.id,
      organizationId: prismaScheduler.organizationId,
      projectId: prismaScheduler.projectId,
      cronId: prismaScheduler.cronId || undefined,
      trigger: prismaScheduler.trigger,
      action: prismaScheduler.action,
      createdAt: prismaScheduler.createdAt,
      createdBy: prismaScheduler.createdBy,
      updatedAt: prismaScheduler.updatedAt,
      updatedBy: prismaScheduler.updatedBy || undefined,
    }
  }

  protected toPrismaCreate(data: SchedulerEntity): any {
    return {
      cronId: data.cronId,
      trigger: data.trigger,
      action: data.action,
      createdBy: data.createdBy,
      organization: {
        connect: { id: data.organizationId },
      },
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: SchedulerEntity): any {
    return {
      organizationId: data.organizationId,
      projectId: data.projectId,
      cronId: data.cronId,
      trigger: data.trigger,
      action: data.action,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<SchedulerEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<SchedulerEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<SchedulerEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }

  async findByOrganization(organizationId: string, options?: any): Promise<SchedulerEntity[]> {
    return this.findMany({ where: { organizationId }, ...options })
  }

  async findByCronId(cronId: string, options?: any): Promise<SchedulerEntity[]> {
    return this.findMany({ where: { cronId }, ...options })
  }
}
