import { Injectable } from '@nestjs/common'
import { Stat as PrismaStat } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { StatEntity } from '../../domain/entities/stat.entity'

@Injectable()
export class StatPrismaRepository
  extends BasePrismaRepository<StatEntity, any, any, any, any, any, never, any, any, any, any, any>
  implements IBaseRepository<StatEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'stat')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaStat: PrismaStat): StatEntity {
    return new StatEntity({
      id: prismaStat.id,
      type: prismaStat.type,
      data: prismaStat.data ? (prismaStat.data as any) : undefined,
      userId: prismaStat.userId || undefined,
      projectId: prismaStat.projectId,
      organizationId: prismaStat.organizationId || undefined,
      year: prismaStat.year,
      month: prismaStat.month,
      date: prismaStat.date,
      updatedAt: prismaStat.updatedAt || undefined,
    })
  }

  protected toPrismaCreate(data: StatEntity): any {
    return {
      type: data.type,
      data: data.data,
      year: data.year,
      month: data.month,
      date: data.date,
      user: data.userId
        ? {
            connect: { id: data.userId },
          }
        : undefined,
      project: {
        connect: { id: data.projectId },
      },
      organization: data.organizationId
        ? {
            connect: { id: data.organizationId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: StatEntity): any {
    return {
      type: data.type,
      data: data.data,
      userId: data.userId,
      projectId: data.projectId,
      organizationId: data.organizationId,
      year: data.year,
      month: data.month,
      date: data.date,
    }
  }

  async findById(id: string, options?: any): Promise<StatEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<StatEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<StatEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }

  async findByUser(userId: string, options?: any): Promise<StatEntity[]> {
    return this.findMany({ where: { userId }, ...options })
  }

  async findByOrganization(organizationId: string, options?: any): Promise<StatEntity[]> {
    return this.findMany({ where: { organizationId }, ...options })
  }

  async findByDateRange(
    projectId: string,
    startYear: number,
    startMonth: number,
    startDate: number,
    endYear: number,
    endMonth: number,
    endDate: number,
    options?: any,
  ): Promise<StatEntity[]> {
    return this.findMany({
      where: {
        projectId,
        OR: [
          { year: { gt: startYear } },
          { year: startYear, month: { gt: startMonth } },
          { year: startYear, month: startMonth, date: { gte: startDate } },
        ],
        AND: [
          { year: { lt: endYear } },
          { year: endYear, month: { lt: endMonth } },
          { year: endYear, month: endMonth, date: { lte: endDate } },
        ],
      },
      orderBy: [{ year: 'asc' }, { month: 'asc' }, { date: 'asc' }],
      ...options,
    })
  }
}
