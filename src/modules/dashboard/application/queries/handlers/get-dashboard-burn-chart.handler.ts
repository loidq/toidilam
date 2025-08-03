//create dashboard-summary.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskPrismaRepository } from '@/modules/task/infrastructure/repositories/task-prisma.repository'

import { DashboardComponentType } from '../../../domain/enums/dashboard-component-type.enum'
import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { GetDashboardBurnChartQuery } from '../dashboard.queries'

type TDateChart = {
  dueDateMax: number
  dueDateMin: number
  planedMinArr: number[]
  planedMaxArr: number[]
  planedDateArr: number[]
  dates: number[]
}

type TaskChart = {
  id: string
  dueDate: Date | null
  plannedDueDate: Date | null
}

@QueryHandler(GetDashboardBurnChartQuery)
export class GetDashboardBurnChartQueryHandler
  implements IQueryHandler<GetDashboardBurnChartQuery>
{
  constructor(
    private readonly dashboardRepository: DashboardPrismaRepository,
    private readonly taskRepository: TaskPrismaRepository,
  ) {}

  async execute(query: GetDashboardBurnChartQuery): Promise<any> {
    const {
      startDate,
      endDate,
      projectIds,

      assigneeIds,

      type,
    } = query
    const where = this.generateQueryCondition({
      startDate,
      endDate,
      assigneeIds,
      projectIds,
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
        plannedDueDate: true,
        dueDate: true,
      },
    })
    const tasks = rawTasks.map(task => ({
      id: task.id!,
      dueDate: task?.dueDate,
      plannedDueDate: task?.plannedDueDate,
      assigneeIds: task.taskAssignees.map(a => a.userId),
    }))

    const dates = this.handleDates(tasks as TaskChart[])
    const ideal = this.handleIdeal(dates, tasks as TaskChart[], type as DashboardComponentType)
    const actual = this.handleActual(dates, tasks as TaskChart[], type as DashboardComponentType)

    const formatDate = this.convertDate(endDate, dates.dates)

    return {
      dates: formatDate,
      ideal,
      actual,
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

  private handleDates = (tasks: TaskChart[]): TDateChart => {
    let planeDateMin = Infinity
    let planeDateMax = -Infinity
    let dueDateMin = Infinity
    let dueDateMax = -Infinity

    for (const task of tasks) {
      if (task.plannedDueDate) {
        const datePlaned = new Date(task.plannedDueDate).getDate()
        if (datePlaned > planeDateMax) {
          planeDateMax = datePlaned
        }
        if (datePlaned < planeDateMin) {
          planeDateMin = datePlaned
        }
      }

      if (task.dueDate) {
        const dueDate = new Date(task.dueDate).getDate()
        if (dueDate > dueDateMax) {
          dueDateMax = dueDate
        }
        if (dueDate < dueDateMin) {
          dueDateMin = dueDate
        }
      }
    }
    const planedDateArr = []
    for (let i = planeDateMin; i <= planeDateMax; i++) {
      planedDateArr.push(i)
    }

    const planedMinArr = []
    const planedMaxArr = []
    for (const task of tasks) {
      if (!task.dueDate) continue

      const dueDate = new Date(task.dueDate).getDate()
      if (dueDate < planeDateMin) {
        planedMinArr.push(dueDate)
      }

      if (dueDate > planeDateMax) {
        planedMaxArr.push(dueDate)
      }
    }

    planedMinArr.sort((a, b) => a - b)
    planedMaxArr.sort((a, b) => a - b)

    return {
      dueDateMax,
      dueDateMin,
      planedMinArr,
      planedDateArr,
      planedMaxArr,
      dates: [0, ...planedMinArr, ...planedDateArr, ...planedMaxArr],
    }
  }

  private handleIdeal = (date: TDateChart, tasks: TaskChart[], type: DashboardComponentType) => {
    const { planedMinArr, planedDateArr } = date
    const totalTask = tasks.length

    // Precompute số lượng task theo ngày
    const taskCountByDate = new Map<number, number>()
    for (const task of tasks) {
      if (!task.plannedDueDate) continue
      const d = new Date(task.plannedDueDate).getDate() // nếu cần chính xác hơn nên đổi sang toISOString().slice(0,10)
      taskCountByDate.set(d, (taskCountByDate.get(d) || 0) + 1)
    }

    const minIdealArr = Array(planedMinArr.length).fill(totalTask)
    const idealArr: number[] = []
    let decremental = totalTask
    let incremental = 0

    for (const planedDate of planedDateArr) {
      const countTask = taskCountByDate.get(planedDate) || 0

      if (type === DashboardComponentType.BURNDOWN) {
        decremental -= countTask
        idealArr.push(decremental)
      } else {
        incremental += countTask
        idealArr.push(incremental)
      }
    }

    return type === DashboardComponentType.BURNDOWN
      ? [totalTask, ...minIdealArr, ...idealArr]
      : [0, ...minIdealArr, ...idealArr]
  }

  private handleActual = (date: TDateChart, tasks: TaskChart[], type: DashboardComponentType) => {
    const { dates, dueDateMin, dueDateMax } = date
    const totalTask = tasks.length

    // Chuẩn hóa ngày thành YYYY-MM-DD
    const formatDate = (d: Date | string) => {
      const dt = new Date(d)
      return dt.toISOString().slice(0, 10) // yyyy-mm-dd
    }

    // Map số lượng task theo ngày
    const taskCountByDate = new Map<string, number>()
    for (const task of tasks) {
      if (!task.dueDate) continue
      const key = formatDate(task.dueDate)
      taskCountByDate.set(key, (taskCountByDate.get(key) || 0) + 1)
    }

    // Lấy index của dueDateMax để giới hạn dữ liệu
    const index = dates.indexOf(dueDateMax)
    const dateActualArr = dates.slice(0, index + 1)

    const actual: number[] = []
    let decremental = totalTask
    let incremental = 0

    for (const d of dateActualArr) {
      if (d < dueDateMin) {
        actual.push(type === DashboardComponentType.BURNDOWN ? totalTask : 0)
        continue
      }
      if (d >= dueDateMax) {
        actual.push(type === DashboardComponentType.BURNDOWN ? 0 : incremental)
        continue
      }

      const countTask = taskCountByDate.get(String(d)) || 0

      if (type === DashboardComponentType.BURNDOWN) {
        decremental -= countTask
        actual.push(decremental)
      } else {
        incremental += countTask
        actual.push(incremental)
      }
    }

    return actual
  }

  private convertDate = (date: Date | string | undefined, dates: number[]): string[] => {
    if (!Array.isArray(dates)) {
      throw new Error('Invalid input data: dates must be an array')
    }

    if (!date) {
      return dates.map(() => '')
    }

    const baseDate = new Date(date)
    if (isNaN(baseDate.getTime())) {
      throw new Error('Invalid input data: date is not valid')
    }

    const month = baseDate.getMonth() + 1

    return dates.map((day, index) => {
      if (day === 0 && index === 0) return 'Day'
      return `${day}/${month}`
    })
  }
}
