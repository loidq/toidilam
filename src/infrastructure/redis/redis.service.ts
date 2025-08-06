import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

import { CKEY } from './redis.enums'
//eslint-disable-next-line @typescript-eslint/naming-convention
export type CACHE_KEY = CKEY | (CKEY | string)[]
@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis

  constructor(private configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST') || 'localhost',
      port: this.configService.get<number>('REDIS_PORT') || 6379,
      password: this.configService.get<string>('REDIS_PASSWORD'),
      db: this.configService.get<number>('REDIS_DB') || 0,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
    })

    this.client.on('error', (err: Error) => {
      console.error('Redis Client Error:', err)
    })

    this.client.on('connect', () => {
      console.log('Redis Client Connected')
    })
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit()
  }

  // Key generator helper
  createKey(cacheKey: CACHE_KEY): string {
    if (typeof cacheKey === 'string') {
      return cacheKey
    }
    return cacheKey.join('_')
  }

  // Convenience methods using createKey
  async setCacheJson<T>(cacheKey: CACHE_KEY, value: T, ttl?: number): Promise<void> {
    await this.setJson(cacheKey, value, ttl)
  }

  async getCacheJson<T>(cacheKey: CACHE_KEY): Promise<T | null> {
    return await this.getJson<T>(cacheKey)
  }

  async setCacheString(cacheKey: CACHE_KEY, value: string, ttl?: number): Promise<void> {
    await this.set(cacheKey, value, ttl)
  }

  async getCacheString(cacheKey: CACHE_KEY): Promise<string | null> {
    return await this.get(cacheKey)
  }

  async deleteCacheKey(cacheKey: CACHE_KEY): Promise<number> {
    return await this.del(cacheKey)
  }

  async existsCacheKey(cacheKey: CACHE_KEY): Promise<boolean> {
    const result = await this.exists(cacheKey)
    return result > 0
  }

  async expireCacheKey(cacheKey: CACHE_KEY, seconds: number): Promise<number> {
    return await this.expire(cacheKey, seconds)
  }

  // String operations
  async set(key: CACHE_KEY, value: string, ttl?: number): Promise<void> {
    const keyStr = this.createKey(key)
    if (ttl) {
      await this.client.setex(keyStr, ttl, value)
    } else {
      await this.client.set(keyStr, value)
    }
  }

  async get(key: CACHE_KEY): Promise<string | null> {
    const keyStr = this.createKey(key)
    return await this.client.get(keyStr)
  }

  async del(key: CACHE_KEY): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.del(keyStr)
  }

  // JSON operations
  async setJson<T>(key: CACHE_KEY, value: T, ttl?: number): Promise<void> {
    const jsonValue = JSON.stringify(value)
    await this.set(key, jsonValue, ttl)
  }

  async getJson<T>(key: CACHE_KEY): Promise<T | null> {
    const value = await this.get(key)
    return value ? JSON.parse(value) : null
  }

  // Hash operations
  async hSet(key: CACHE_KEY, field: string, value: string): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.hset(keyStr, field, value)
  }

  async hGet(key: CACHE_KEY, field: string): Promise<string | null> {
    const keyStr = this.createKey(key)
    return await this.client.hget(keyStr, field)
  }

  async hGetAll(key: CACHE_KEY): Promise<Record<string, string>> {
    const keyStr = this.createKey(key)
    return await this.client.hgetall(keyStr)
  }

  async hDel(key: CACHE_KEY, field: string): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.hdel(keyStr, field)
  }

  // List operations
  async lPush(key: CACHE_KEY, ...values: string[]): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.lpush(keyStr, ...values)
  }

  async rPush(key: CACHE_KEY, ...values: string[]): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.rpush(keyStr, ...values)
  }

  async lPop(key: CACHE_KEY): Promise<string | null> {
    const keyStr = this.createKey(key)
    return await this.client.lpop(keyStr)
  }

  async rPop(key: CACHE_KEY): Promise<string | null> {
    const keyStr = this.createKey(key)
    return await this.client.rpop(keyStr)
  }

  async lRange(key: CACHE_KEY, start: number, stop: number): Promise<string[]> {
    const keyStr = this.createKey(key)
    return await this.client.lrange(keyStr, start, stop)
  }

  // Set operations
  async sAdd(key: CACHE_KEY, ...members: string[]): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.sadd(keyStr, ...members)
  }

  async sMembers(key: CACHE_KEY): Promise<string[]> {
    const keyStr = this.createKey(key)
    return await this.client.smembers(keyStr)
  }

  async sRem(key: CACHE_KEY, ...members: string[]): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.srem(keyStr, ...members)
  }

  // Utility methods
  async exists(key: CACHE_KEY): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.exists(keyStr)
  }

  async expire(key: CACHE_KEY, seconds: number): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.expire(keyStr, seconds)
  }

  async ttl(key: CACHE_KEY): Promise<number> {
    const keyStr = this.createKey(key)
    return await this.client.ttl(keyStr)
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern)
  }

  async flushAll(): Promise<string> {
    return await this.client.flushall()
  }

  // Pub/Sub operations
  async publish(channel: CACHE_KEY, message: string): Promise<number> {
    const channelStr = this.createKey(channel)
    return await this.client.publish(channelStr, message)
  }

  async subscribe(
    channel: CACHE_KEY,
    callback: (channel: string, message: string) => void,
  ): Promise<void> {
    const subscriber = this.client.duplicate()
    const channelStr = this.createKey(channel)
    await subscriber.subscribe(channelStr)
    subscriber.on('message', callback)
  }

  // Pipeline operations
  pipeline(): ReturnType<Redis['pipeline']> {
    return this.client.pipeline()
  }

  // Transaction operations
  multi(): ReturnType<Redis['multi']> {
    return this.client.multi()
  }

  // Get raw client for advanced operations
  getClient(): Redis {
    return this.client
  }

  // Helper method to get string key for advanced operations
  getStringKey(cacheKey: CACHE_KEY): string {
    return this.createKey(cacheKey)
  }

  // Raw string operations for advanced use cases
  async setRaw(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, value)
    } else {
      await this.client.set(key, value)
    }
  }

  async getRaw(key: string): Promise<string | null> {
    return await this.client.get(key)
  }

  async delRaw(key: string): Promise<number> {
    return await this.client.del(key)
  }
}
