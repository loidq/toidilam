import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { GetPinnedProjectsWithDetailsQuery } from '../get-pinned-projects-with-details.query'

@Injectable()
@QueryHandler(GetPinnedProjectsWithDetailsQuery)
export class GetPinnedProjectsWithDetailsQueryHandler
  implements IQueryHandler<GetPinnedProjectsWithDetailsQuery>
{
  constructor(
    private readonly userRepository: UserPrismaRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute({ userId }: GetPinnedProjectsWithDetailsQuery): Promise<any[]> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const settings = user.settings || {}
    const pinnedProjectIds = settings.pinnedProjects || []

    if (pinnedProjectIds.length === 0) {
      return []
    }

    // Fetch project details for pinned projects
    const projects = await this.prisma.project.findMany({
      where: {
        id: {
          in: pinnedProjectIds,
        },
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        desc: true,
        cover: true,
        icon: true,
        organizationId: true,
        createdAt: true,
        updatedAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        members: {
          where: {
            userId: userId,
          },
          select: {
            role: true,
          },
        },
        tasks: {
          select: {
            id: true,
            done: true,
          },
        },
      },
    })

    // Calculate task statistics for each project
    const projectsWithStats = projects.map(project => {
      const totalTasks = project.tasks.length
      const completedTasks = project.tasks.filter(task => task.done).length
      const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

      return {
        id: project.id,
        name: project.name,
        desc: project.desc,
        cover: project.cover,
        icon: project.icon,
        organizationId: project.organizationId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        organization: project.organization,
        userRole: project.members[0]?.role || null,
        taskStats: {
          total: totalTasks,
          completed: completedTasks,
          completionRate: Math.round(completionRate * 100) / 100,
        },
      }
    })

    // Sort by the order in pinnedProjectIds to maintain user's preferred order
    const sortedProjects = pinnedProjectIds
      .map((id: string) => projectsWithStats.find(project => project.id === id))
      .filter(Boolean)

    return sortedProjects
  }
}
