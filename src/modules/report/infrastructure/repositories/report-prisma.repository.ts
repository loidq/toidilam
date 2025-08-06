import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

@Injectable()
export class ReportPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProjectReport(projectIds: string[], startDate: Date, endDate: Date): Promise<any> {
    const tasks = await this.prisma.task.findMany({
      where: {
        projectId: {
          in: projectIds,
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        taskAssignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        taskStatus: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        taskTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
      },
    })

    // Group tasks by project
    const reportData = projectIds.map(projectId => {
      const projectTasks = tasks.filter(task => task.projectId === projectId)
      const project = projectTasks[0]?.project

      const totalTasks = projectTasks.length
      const completedTasks = projectTasks.filter(task => task.done).length
      const inProgressTasks = projectTasks.filter(
        task => !task.done && task.taskStatus?.type === 'INPROCESS',
      ).length
      const todoTasks = projectTasks.filter(
        task => !task.done && task.taskStatus?.type === 'TODO',
      ).length

      return {
        projectId,
        projectName: project?.name || 'Unknown Project',
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        tasks: projectTasks,
      }
    })

    return {
      startDate,
      endDate,
      projects: reportData,
      summary: {
        totalProjects: projectIds.length,
        totalTasks: tasks.length,
        totalCompletedTasks: tasks.filter(task => task.done).length,
        overallCompletionRate:
          tasks.length > 0 ? (tasks.filter(task => task.done).length / tasks.length) * 100 : 0,
      },
    }
  }

  async getMemberReport(
    startDate: Date,
    endDate: Date,
    projectIds: string[],
    memberId: string,
  ): Promise<any> {
    const tasks = await this.prisma.task.findMany({
      where: {
        projectId: {
          in: projectIds,
        },
        taskAssignees: {
          some: {
            userId: memberId,
          },
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        taskAssignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        taskStatus: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        taskTags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
      },
    })

    // Get member info
    const member = await this.prisma.user.findUnique({
      where: { id: memberId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    // Group tasks by project
    const projectReports = projectIds.map(projectId => {
      const projectTasks = tasks.filter(task => task.projectId === projectId)
      const project = projectTasks[0]?.project

      const totalTasks = projectTasks.length
      const completedTasks = projectTasks.filter(task => task.done).length
      const inProgressTasks = projectTasks.filter(
        task => !task.done && task.taskStatus?.type === 'INPROCESS',
      ).length
      const todoTasks = projectTasks.filter(
        task => !task.done && task.taskStatus?.type === 'TODO',
      ).length

      return {
        projectId,
        projectName: project?.name || 'Unknown Project',
        totalTasks,
        completedTasks,
        inProgressTasks,
        todoTasks,
        completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        tasks: projectTasks,
      }
    })

    return {
      startDate,
      endDate,
      member,
      projects: projectReports,
      summary: {
        totalProjects: projectIds.length,
        totalTasks: tasks.length,
        totalCompletedTasks: tasks.filter(task => task.done).length,
        overallCompletionRate:
          tasks.length > 0 ? (tasks.filter(task => task.done).length / tasks.length) * 100 : 0,
      },
    }
  }
}
