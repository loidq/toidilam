import crypto from 'crypto'

import { Injectable } from '@nestjs/common'

import { CKEY, RedisService } from '@/infrastructure/redis'

@Injectable()
export class TaskCacheService {
  private readonly taskCacheTtl = 1800 // 30 minutes
  private readonly taskStatsCacheTtl = 600 // 10 minutes
  private readonly taskCounterCacheTtl = 300 // 5 minutes

  constructor(private readonly redisService: RedisService) {}

  // Generate cache key for task list query
  private generateTaskListKey(params: Record<string, any>): string {
    const sortedParams = JSON.stringify(params, Object.keys(params).sort())
    const hash = crypto.createHash('md5').update(sortedParams).digest('hex')
    return `${CKEY.TASK_LIST}_${hash}`
  }

  // Cache task list
  async cacheTaskList(params: Record<string, any>, taskData: any): Promise<void> {
    const key = this.generateTaskListKey(params)
    await this.redisService.setRaw(key, JSON.stringify(taskData), this.taskCacheTtl)
    console.log(`Task list cached with key: ${key}`)
  }

  // Get task list from cache
  async getCachedTaskList(params: Record<string, any>): Promise<any | null> {
    const key = this.generateTaskListKey(params)
    const cachedData = await this.redisService.getRaw(key)
    if (cachedData) {
      console.log(`Task list retrieved from cache: ${key}`)
      return JSON.parse(cachedData)
    }
    return null
  }

  // Cache task status list for project
  async cacheTaskStatusList(projectId: string, statusList: any): Promise<void> {
    const key = [CKEY.TASK_STATUS_LIST, projectId]
    await this.redisService.setJson(key, statusList, this.taskCacheTtl)
    console.log(`Task status list cached for project: ${projectId}`)
  }

  // Get task status list from cache
  async getCachedTaskStatusList(projectId: string): Promise<any | null> {
    const key = [CKEY.TASK_STATUS_LIST, projectId]
    return await this.redisService.getJson(key)
  }

  // Cache project task counter
  async cacheProjectTaskCounter(projectId: string, counter: number): Promise<void> {
    const key = [CKEY.PROJECT_TASK_COUNTER, projectId]
    await this.redisService.setJson(key, counter, this.taskCounterCacheTtl)
    console.log(`Project task counter cached: ${projectId}`)
  }

  // Get project task counter from cache
  async getCachedProjectTaskCounter(projectId: string): Promise<number | null> {
    const key = [CKEY.PROJECT_TASK_COUNTER, projectId]
    return await this.redisService.getJson<number>(key)
  }

  // Cache todo counter for user/project
  async cacheTodoCounter(userId: string, projectId: string, counter: number): Promise<void> {
    const key = [CKEY.TODO_COUNTER, userId, projectId]
    await this.redisService.setJson(key, counter, this.taskCounterCacheTtl)
    console.log(`Todo counter cached for user ${userId} in project ${projectId}`)
  }

  // Get todo counter from cache
  async getCachedTodoCounter(userId: string, projectId: string): Promise<number | null> {
    const key = [CKEY.TODO_COUNTER, userId, projectId]
    return await this.redisService.getJson<number>(key)
  }

  // Cache task statistics for project
  async cacheTaskStats(projectId: string, stats: any): Promise<void> {
    const key = [CKEY.TASK_STATS, projectId]
    await this.redisService.setJson(key, stats, this.taskStatsCacheTtl)
    console.log(`Task stats cached for project: ${projectId}`)
  }

  // Get task statistics from cache
  async getCachedTaskStats(projectId: string): Promise<any | null> {
    const key = [CKEY.TASK_STATS, projectId]
    return await this.redisService.getJson(key)
  }

  // Invalidate all task cache
  async invalidateAllTaskCache(): Promise<void> {
    const patterns = [
      `${CKEY.TASK_LIST}_*`,
      `${CKEY.TASK_STATUS_LIST}_*`,
      `${CKEY.PROJECT_TASK_COUNTER}_*`,
      `${CKEY.TODO_COUNTER}_*`,
      `${CKEY.TASK_STATS}_*`,
    ]

    for (const pattern of patterns) {
      const keys = await this.redisService.keys(pattern)
      if (keys.length > 0) {
        await Promise.all(keys.map(key => this.redisService.delRaw(key)))
        console.log(`Invalidated ${keys.length} task cache keys for pattern: ${pattern}`)
      }
    }
  }

  // Invalidate task cache for specific project
  async invalidateProjectTaskCache(projectId: string): Promise<void> {
    const keysToDelete = [
      [CKEY.TASK_STATUS_LIST, projectId],
      [CKEY.PROJECT_TASK_COUNTER, projectId],
      [CKEY.TASK_STATS, projectId],
    ]

    await Promise.all(keysToDelete.map(key => this.redisService.del(key)))

    // Also invalidate task list cache (wildcard patterns)
    const patterns = [`${CKEY.TASK_LIST}_*`, `${CKEY.TODO_COUNTER}_*`]

    for (const pattern of patterns) {
      const keys = await this.redisService.keys(pattern)
      if (keys.length > 0) {
        await Promise.all(keys.map(key => this.redisService.delRaw(key)))
      }
    }

    console.log(`Invalidated task cache for project: ${projectId}`)
  }

  // Invalidate todo counter for specific user
  async invalidateUserTodoCounter(userId: string): Promise<void> {
    const pattern = `${CKEY.TODO_COUNTER}_${userId}_*`
    const keys = await this.redisService.keys(pattern)
    if (keys.length > 0) {
      await Promise.all(keys.map(key => this.redisService.delRaw(key)))
      console.log(`Invalidated todo counter cache for user: ${userId}`)
    }
  }

  // Batch invalidate task cache for multiple projects
  async batchInvalidateProjectTaskCache(projectIds: string[]): Promise<void> {
    const invalidatePromises = projectIds.map(projectId =>
      this.invalidateProjectTaskCache(projectId),
    )

    await Promise.all(invalidatePromises)
    console.log(`Batch invalidated task cache for ${projectIds.length} projects`)
  }
}
