import { Injectable } from '@nestjs/common'

import { CKEY, RedisService } from '@/infrastructure/redis'
import { UserEntity } from '@/modules/user/domain/entities/user.entity'

@Injectable()
export class UserCacheService {
  private readonly userCacheTtl = 3600 // 1 hour

  constructor(private readonly redisService: RedisService) {}

  // Cache user data
  async cacheUser(userId: string, userData: UserEntity): Promise<void> {
    await this.redisService.setJson([CKEY.USER, userId], userData, this.userCacheTtl)
    console.log(`User cached: ${userId}`)
  }

  // Get user from cache
  async getCachedUser(userId: string): Promise<UserEntity | null> {
    const cachedUser = await this.redisService.getJson<UserEntity>([CKEY.USER, userId])
    if (cachedUser) {
      console.log(`User retrieved from cache: ${userId}`)
    }
    return cachedUser
  }

  // Invalidate user cache
  async invalidateUser(userId: string): Promise<void> {
    await this.redisService.del([CKEY.USER, userId])
    console.log(`User cache invalidated: ${userId}`)
  }

  // Cache user's pinned projects
  async cacheUserPinnedProjects(userId: string, projectIds: string[]): Promise<void> {
    await this.redisService.setJson([CKEY.USER_PROJECT, userId], projectIds, this.userCacheTtl)
    console.log(`User pinned projects cached: ${userId}`)
  }

  // Get user's pinned projects from cache
  async getCachedUserPinnedProjects(userId: string): Promise<string[] | null> {
    return await this.redisService.getJson<string[]>([CKEY.USER_PROJECT, userId])
  }

  // Cache user's organizations
  async cacheUserOrganizations(userId: string, organizations: any[]): Promise<void> {
    await this.redisService.setJson([CKEY.USER_ORGS, userId], organizations, this.userCacheTtl)
    console.log(`User organizations cached: ${userId}`)
  }

  // Get user's organizations from cache
  async getCachedUserOrganizations(userId: string): Promise<any[] | null> {
    return await this.redisService.getJson<any[]>([CKEY.USER_ORGS, userId])
  }

  // Invalidate all user-related caches
  async invalidateAllUserCaches(userId: string): Promise<void> {
    await Promise.all([
      this.redisService.del([CKEY.USER, userId]),
      this.redisService.del([CKEY.USER_PROJECT, userId]),
      this.redisService.del([CKEY.USER_ORGS, userId]),
    ])
    console.log(`All user caches invalidated: ${userId}`)
  }

  // Check if user cache exists
  async userCacheExists(userId: string): Promise<boolean> {
    const result = await this.redisService.exists([CKEY.USER, userId])
    return result > 0
  }

  // Extend user cache TTL
  async extendUserCacheTTL(userId: string, additionalSeconds = 3600): Promise<void> {
    await this.redisService.expire([CKEY.USER, userId], additionalSeconds)
    console.log(`User cache TTL extended: ${userId}`)
  }

  // Get user cache TTL
  async getUserCacheTTL(userId: string): Promise<number> {
    return await this.redisService.ttl([CKEY.USER, userId])
  }

  // Batch cache multiple users
  async batchCacheUsers(users: { userId: string; userData: UserEntity }[]): Promise<void> {
    const pipeline = this.redisService.pipeline()

    for (const { userId, userData } of users) {
      const key = this.redisService.getStringKey([CKEY.USER, userId])
      pipeline.setex(key, this.userCacheTtl, JSON.stringify(userData))
    }

    await pipeline.exec()
    console.log(`Batch cached ${users.length} users`)
  }
}
