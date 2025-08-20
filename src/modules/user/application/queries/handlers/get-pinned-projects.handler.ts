import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { UserCacheService } from '../../services/user-cache.service'
import { GetPinnedProjectsQuery } from '../get-pinned-projects.query'

@Injectable()
@QueryHandler(GetPinnedProjectsQuery)
export class GetPinnedProjectsQueryHandler implements IQueryHandler<GetPinnedProjectsQuery> {
  constructor(
    private readonly userRepository: UserPrismaRepository,
    private readonly userCacheService: UserCacheService,
  ) {}

  async execute({ userId }: GetPinnedProjectsQuery): Promise<string[]> {
    // 1. Kiểm tra cache trước
    const cachedPinnedProjects = await this.userCacheService.getCachedUserPinnedProjects(userId)
    if (cachedPinnedProjects) {
      console.log('Pinned projects retrieved from cache:', userId)
      return cachedPinnedProjects
    }

    // 2. Nếu không có cache, query từ database
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const settings = user.settings || {}
    const pinnedProjects = settings.pinnedProjects || []

    // 3. Cache kết quả
    await this.userCacheService.cacheUserPinnedProjects(userId, pinnedProjects)
    console.log('Pinned projects cached:', userId)

    return pinnedProjects
  }
}
