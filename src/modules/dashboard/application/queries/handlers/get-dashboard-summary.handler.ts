//create dashboard-summary.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { GetDashboardSummaryQuery } from '../dashboard.queries'

@QueryHandler(GetDashboardSummaryQuery)
export class GetDashboardSummaryHandler implements IQueryHandler<GetDashboardSummaryQuery> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute(query: GetDashboardSummaryQuery): Promise<any> {
    const { projectIds, statusIds, startDate, endDate, priority, assigneeIds } = query

    const where = this.generateQueryCondition({
      projectIds,
      statusIds,
      assigneeIds,
      startDate,
      endDate,
      priority,
    })

    return await this.dashboardRepository.count({
      where,
    })
  }

  private generateQueryCondition = ({
    projectIds,
    statusIds,
    assigneeIds,
    startDate,
    endDate,
    points,
    priority,
  }: {
    projectIds?: string[]
    statusIds?: string[]
    assigneeIds?: string[]
    startDate?: Date
    endDate?: Date
    points?: number[]
    priority?: string[]
  }) => {
    const where: {
      [key: string]: unknown
    } = {}

    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate) : null

      // today tasks
      if (start && end && start.getTime() === end.getTime()) {
        console.log('date:today')
        const startAtZero = new Date(start.getFullYear(), start.getMonth(), start.getDate())
        const nextDay = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1)
        where.AND = [{ dueDate: { gte: startAtZero } }, { dueDate: { lt: nextDay } }]
      }

      // task in date range
      if (start && end && start.getTime() !== end.getTime()) {
        console.log('date:range', start, end)
        where.AND = [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
      }

      // upcoming tasks
      if (start && !end) {
        console.log('date:upcoming', start)
        where.dueDate = {
          gte: start,
        }
      }

      // overdue tasks
      if (!start && end) {
        console.log('date:overdue')
        where.dueDate = {
          lte: end,
        }
      }
    }

    if (assigneeIds && assigneeIds.length) {
      where.assigneeIds = {
        hasSome: assigneeIds,
      }
    }

    if (projectIds && projectIds.length) {
      const [operator, ...restProjectIds] = projectIds
      if (operator === 'not_in') {
        where.projectId = {
          notIn: restProjectIds,
        }
      }

      if (operator === 'in') {
        where.projectId = {
          in: restProjectIds,
        }
      }
    }

    if (statusIds && statusIds.length) {
      const [operator, ...restStatusIds] = statusIds

      if (operator === 'not_in') {
        where.taskStatusId = {
          notIn: restStatusIds,
        }
      }

      if (operator === 'in') {
        where.taskStatusId = {
          in: restStatusIds,
        }
      }
    }

    if (points && points.length) {
      where.taskPoint = {
        in: points,
      }
    }

    if (priority && priority.length) {
      const [operator, ...rest] = priority

      if (operator === 'not_in') {
        where.priority = {
          notIn: rest,
        }
      }

      if (operator === 'in') {
        where.priority = {
          in: rest,
        }
      }
    }

    return where
  }
}
