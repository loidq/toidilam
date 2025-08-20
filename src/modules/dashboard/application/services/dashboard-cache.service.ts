import crypto from 'crypto'

import { Injectable } from '@nestjs/common'

import { CKEY, RedisService } from '@/infrastructure/redis'

@Injectable()
export class DashboardCacheService {
  private readonly dashboardCacheTtl = 1800 // 30 minutes
  private readonly chartCacheTtl = 3600 // 1 hour

  constructor(private readonly redisService: RedisService) {}

  // Generate cache key for dashboard summary
  private generateSummaryKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.DASHBOARD_SUMMARY}_${hash}`
  }

  // Generate cache key for burn chart
  private generateBurnChartKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.DASHBOARD_BURN_CHART}_${hash}`
  }

  // Generate cache key for column chart
  private generateColumnChartKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.DASHBOARD_COLUMN_CHART}_${hash}`
  }

  // Cache dashboard summary
  async cacheDashboardSummary(params: Record<string, any>, summaryData: any): Promise<void> {
    const key = this.generateSummaryKey(params)
    await this.redisService.setRaw(key, JSON.stringify(summaryData), this.dashboardCacheTtl)
    console.log(`Dashboard summary cached with key: ${key}`)
  }

  // Get dashboard summary from cache
  async getCachedDashboardSummary(params: Record<string, any>): Promise<any | null> {
    const key = this.generateSummaryKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Dashboard summary retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Cache burn chart data
  async cacheBurnChartData(params: Record<string, any>, chartData: any): Promise<void> {
    const key = this.generateBurnChartKey(params)
    await this.redisService.setRaw(key, JSON.stringify(chartData), this.chartCacheTtl)
    console.log(`Burn chart data cached with key: ${key}`)
  }

  // Get burn chart data from cache
  async getCachedBurnChartData(params: Record<string, any>): Promise<any | null> {
    const key = this.generateBurnChartKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Burn chart data retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Cache column chart data
  async cacheColumnChartData(params: Record<string, any>, chartData: any): Promise<void> {
    const key = this.generateColumnChartKey(params)
    await this.redisService.setRaw(key, JSON.stringify(chartData), this.chartCacheTtl)
    console.log(`Column chart data cached with key: ${key}`)
  }

  // Get column chart data from cache
  async getCachedColumnChartData(params: Record<string, any>): Promise<any | null> {
    const key = this.generateColumnChartKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Column chart data retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Invalidate dashboard cache for specific projects
  async invalidateDashboardCache(_projectIds?: string[]): Promise<void> {
    const patterns = [
      `${CKEY.DASHBOARD_SUMMARY}_*`,
      `${CKEY.DASHBOARD_BURN_CHART}_*`,
      `${CKEY.DASHBOARD_COLUMN_CHART}_*`,
    ]

    for (const pattern of patterns) {
      const keys = await this.redisService.keys(pattern)
      if (keys.length > 0) {
        await Promise.all(keys.map(key => this.redisService.delRaw(key)))
        console.log(`Invalidated ${keys.length} dashboard cache keys for pattern: ${pattern}`)
      }
    }
  }

  // Cache dashboard statistics
  async cacheDashboardStats(projectId: string, stats: any): Promise<void> {
    const key = [CKEY.DASHBOARD_STATS, projectId]
    await this.redisService.setJson(key, stats, this.dashboardCacheTtl)
    console.log(`Dashboard stats cached for project: ${projectId}`)
  }

  // Get dashboard statistics from cache
  async getCachedDashboardStats(projectId: string): Promise<any | null> {
    const key = [CKEY.DASHBOARD_STATS, projectId]
    return await this.redisService.getJson(key)
  }

  // Batch invalidate cache for multiple projects
  async batchInvalidateProjectCache(projectIds: string[]): Promise<void> {
    const invalidatePromises = projectIds.map(projectId =>
      this.redisService.del([CKEY.DASHBOARD_STATS, projectId]),
    )

    await Promise.all(invalidatePromises)

    // Also invalidate summary and chart caches
    await this.invalidateDashboardCache(projectIds)

    console.log(`Batch invalidated dashboard cache for ${projectIds.length} projects`)
  }
}
