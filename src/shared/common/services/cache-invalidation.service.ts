import { Injectable } from '@nestjs/common'

import { DashboardCacheService } from '@/modules/dashboard/application/services/dashboard-cache.service'
import { ReportCacheService } from '@/modules/report/application/services/report-cache.service'
import { TaskCacheService } from '@/modules/task/application/services/task-cache.service'
import { UserCacheService } from '@/modules/user/application/services/user-cache.service'

@Injectable()
export class CacheInvalidationService {
  constructor(
    private readonly dashboardCacheService: DashboardCacheService,
    private readonly reportCacheService: ReportCacheService,
    private readonly taskCacheService: TaskCacheService,
    private readonly userCacheService: UserCacheService,
  ) {}

  // Invalidate cache when task is created, updated, or deleted
  async invalidateTaskRelatedCache(projectId: string, userId?: string): Promise<void> {
    const invalidatePromises: Promise<any>[] = [
      // Task-specific cache
      this.taskCacheService.invalidateProjectTaskCache(projectId),

      // Dashboard cache (since dashboards use task data)
      this.dashboardCacheService.invalidateDashboardCache([projectId]),

      // Report cache (since reports use task data)
      this.reportCacheService.invalidateProjectReportCache([projectId]),
    ]

    // User-specific cache if userId is provided
    if (userId) {
      invalidatePromises.push(
        this.taskCacheService.invalidateUserTodoCounter(userId),
        this.userCacheService.invalidateUser(userId),
      )
    }

    await Promise.all(invalidatePromises)
    console.log(
      `Invalidated task-related cache for project: ${projectId}${userId ? `, user: ${userId}` : ''}`,
    )
  }

  // Invalidate cache when project is updated
  async invalidateProjectRelatedCache(projectId: string): Promise<void> {
    await Promise.all([
      this.dashboardCacheService.batchInvalidateProjectCache([projectId]),
      this.reportCacheService.invalidateProjectReportCache([projectId]),
      this.taskCacheService.invalidateProjectTaskCache(projectId),
    ])
    console.log(`Invalidated project-related cache for project: ${projectId}`)
  }

  // Invalidate cache when user is updated
  async invalidateUserRelatedCache(userId: string): Promise<void> {
    await Promise.all([
      this.userCacheService.invalidateAllUserCaches(userId),
      this.taskCacheService.invalidateUserTodoCounter(userId),
      this.reportCacheService.invalidateMemberReportCache([userId]),
    ])
    console.log(`Invalidated user-related cache for user: ${userId}`)
  }

  // Invalidate cache when organization is updated
  async invalidateOrganizationRelatedCache(
    organizationId: string,
    userIds: string[] = [],
  ): Promise<void> {
    const invalidatePromises: Promise<any>[] = [
      this.dashboardCacheService.invalidateDashboardCache(),
      this.reportCacheService.invalidateReportCache(),
      this.taskCacheService.invalidateAllTaskCache(),
    ]

    // Invalidate user caches for all users in organization
    if (userIds.length > 0) {
      invalidatePromises.push(
        ...userIds.map(userId => this.userCacheService.invalidateAllUserCaches(userId)),
      )
    }

    await Promise.all(invalidatePromises)
    console.log(`Invalidated organization-related cache for organization: ${organizationId}`)
  }

  // Invalidate cache when task status is updated (affects many queries)
  async invalidateTaskStatusRelatedCache(projectId: string): Promise<void> {
    await Promise.all([
      this.taskCacheService.invalidateProjectTaskCache(projectId),
      this.dashboardCacheService.invalidateDashboardCache([projectId]),
    ])
    console.log(`Invalidated task status-related cache for project: ${projectId}`)
  }

  // Bulk invalidate cache for multiple projects (useful for batch operations)
  async bulkInvalidateProjectCache(projectIds: string[]): Promise<void> {
    await Promise.all([
      this.dashboardCacheService.batchInvalidateProjectCache(projectIds),
      this.reportCacheService.invalidateReportCache(), // Reports can span multiple projects
      this.taskCacheService.batchInvalidateProjectTaskCache(projectIds),
    ])
    console.log(`Bulk invalidated cache for ${projectIds.length} projects`)
  }

  // Complete cache flush (use sparingly, for major system changes)
  async flushAllCache(): Promise<void> {
    await Promise.all([
      this.dashboardCacheService.invalidateDashboardCache(),
      this.reportCacheService.invalidateReportCache(),
      this.taskCacheService.invalidateAllTaskCache(),
    ])
    console.log('Flushed all application cache')
  }
}
