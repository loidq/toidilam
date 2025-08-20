//create dashboard-summary.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'

import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { GetDashboardColumnQuery } from '../dashboard.queries'

type DashboardSummaryTask = {
  id: string
  assigneeIds: string[]
  taskStatusId: string | null
}

@QueryHandler(GetDashboardColumnQuery)
export class GetDashboardColumnQueryHandler implements IQueryHandler<GetDashboardColumnQuery> {
  constructor(
    private readonly dashboardRepository: DashboardPrismaRepository,
    private readonly taskRepository: TaskPrismaRepository,
  ) {}

  async execute(query: GetDashboardColumnQuery): Promise<any> {
    const { startDate, endDate, projectIds, xAxis, series } = query

    const where = this.generateQueryCondition({
      projectIds,
      assigneeIds: xAxis?.assigneeIds,
      statusIds: series?.statusIds,
      startDate,
      endDate,
    })
    const rawTasks = await this.taskRepository.findMany({
      where,
      select: {
        id: true,
        taskAssignees: {
          select: {
            userId: true,
          },
        },
        taskStatusId: true,
        projectId: true,
        taskPoint: true,
        dueDate: true,
      },
    })

    const tasks: DashboardSummaryTask[] = rawTasks.map(task => ({
      id: task.id!,
      assigneeIds: task.taskAssignees.map(a => a.userId),
      taskStatusId: task.taskStatusId ?? null,
    }))
    const { columns, xAxises } = this.generateColumn({
      xAxis,
      series,
      tasks,
    })

    return {
      xAxis: xAxises,
      columns,
    }
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

      if (start && end) {
        const isSameDay = start.getTime() === end.getTime()
        where.AND = isSameDay
          ? [
              {
                dueDate: { gte: new Date(start.getFullYear(), start.getMonth(), start.getDate()) },
              },
              {
                dueDate: {
                  lt: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1),
                },
              },
            ]
          : [{ dueDate: { gte: start } }, { dueDate: { lte: end } }]
      } else if (start) {
        where.dueDate = { gte: start } // upcoming
      } else if (end) {
        where.dueDate = { lte: end } // overdue
      }
    }

    if (assigneeIds?.length) {
      where.taskAssignees = { some: { userId: { in: assigneeIds } } }
    }

    if (projectIds?.length) {
      const [operator, ...ids] = projectIds
      if (operator === 'not_in') where.projectId = { notIn: ids }
      if (operator === 'in') where.projectId = { in: ids }
    }
    if (statusIds?.length) {
      const [operator, ...ids] = statusIds
      if (operator === 'not_in') where.taskStatusId = { notIn: ids }
      if (operator === 'in') where.taskStatusId = { in: ids }
    }

    if (points?.length) {
      where.taskPoint = { in: points }
    }

    if (priority?.length) {
      const [operator, ...ids] = priority
      if (operator === 'not_in') where.priority = { notIn: ids }
      if (operator === 'in') where.priority = { in: ids }
    }

    return where
  }

  private generateColumn = ({
    xAxis,
    series,
    tasks,
  }: {
    xAxis?: {
      assigneeIds?: string[]
    }
    series?: {
      statusIds?: string[]
    }
    tasks: DashboardSummaryTask[]
  }) => {
    const columns: {
      [key: string]: {
        [key: string]: number
      }
    } = {}
    const xAxises: string[] = []

    const seriesIds = series?.statusIds?.filter(stt => !['in', 'not_in'].includes(stt)) || []

    // Khởi tạo cột với 0
    for (const userId of xAxis?.assigneeIds || []) {
      columns[userId] = Object.fromEntries(seriesIds.map(stt => [stt, 0]))
      xAxises.push(userId)
    }

    // Đếm task theo cột
    for (const task of tasks) {
      const colName = task.assigneeIds[0]
      const type = task.taskStatusId
      if (!colName || !type) continue

      columns[colName] ??= {}
      columns[colName][type] = (columns[colName][type] ?? 0) + 1
    }

    return { columns, xAxises }
  }
}
