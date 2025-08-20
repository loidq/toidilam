import crypto from 'crypto'

import { Injectable } from '@nestjs/common'

import { CKEY, RedisService } from '@/infrastructure/redis'

@Injectable()
export class ReportCacheService {
  private readonly reportCacheTtl = 3600 // 1 hour

  constructor(private readonly redisService: RedisService) {}

  // Generate cache key for project report
  private generateProjectReportKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.PROJECT_REPORT}_${hash}`
  }

  // Generate cache key for member report
  private generateMemberReportKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.MEMBER_REPORT}_${hash}`
  }

  // Cache project report
  async cacheProjectReport(params: Record<string, any>, reportData: any): Promise<void> {
    const key = this.generateProjectReportKey(params)
    await this.redisService.setRaw(key, JSON.stringify(reportData), this.reportCacheTtl)
    console.log(`Project report cached with key: ${key}`)
  }

  // Get project report from cache
  async getCachedProjectReport(params: Record<string, any>): Promise<any | null> {
    const key = this.generateProjectReportKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Project report retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Cache member report
  async cacheMemberReport(params: Record<string, any>, reportData: any): Promise<void> {
    const key = this.generateMemberReportKey(params)
    await this.redisService.setRaw(key, JSON.stringify(reportData), this.reportCacheTtl)
    console.log(`Member report cached with key: ${key}`)
  }

  // Get member report from cache
  async getCachedMemberReport(params: Record<string, any>): Promise<any | null> {
    const key = this.generateMemberReportKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Member report retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Invalidate all report cache
  async invalidateReportCache(): Promise<void> {
    const patterns = [`${CKEY.PROJECT_REPORT}_*`, `${CKEY.MEMBER_REPORT}_*`]

    for (const pattern of patterns) {
      const keys = await this.redisService.keys(pattern)
      if (keys.length > 0) {
        await Promise.all(keys.map(key => this.redisService.delRaw(key)))
        console.log(`Invalidated ${keys.length} report cache keys for pattern: ${pattern}`)
      }
    }
  }

  // Invalidate report cache for specific projects
  async invalidateProjectReportCache(projectIds: string[]): Promise<void> {
    // For reports, we invalidate all cache since reports can be cross-project
    await this.invalidateReportCache()
    console.log(`Invalidated report cache for projects: ${projectIds.join(', ')}`)
  }

  // Invalidate report cache for specific members
  async invalidateMemberReportCache(memberIds: string[]): Promise<void> {
    // For member reports, we invalidate all cache since member reports can span multiple projects
    await this.invalidateReportCache()
    console.log(`Invalidated report cache for members: ${memberIds.join(', ')}`)
  }
}
