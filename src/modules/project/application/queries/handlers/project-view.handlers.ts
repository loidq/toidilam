import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectViewEntity } from '@/modules/project/domain/entities/project-view.entity'
import { IProjectViewRepository } from '@/modules/project/domain/repositories/project-view.repository'

import { GetProjectViewQuery, GetProjectViewsQuery } from '../project-view.queries'

@Injectable()
@QueryHandler(GetProjectViewsQuery)
export class GetProjectViewsQueryHandler implements IQueryHandler<GetProjectViewsQuery> {
  constructor(
    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,
  ) {}

  async execute({ projectId, userId, onlyMe }: GetProjectViewsQuery): Promise<ProjectViewEntity[]> {
    if (onlyMe && userId) {
      return await this.projectViewRepository.findMany({
        where: { projectId, onlyMe, createdBy: userId },
        orderBy: { order: 'asc' },
      })
    }
    return await this.projectViewRepository.findMany({
      where: { projectId, onlyMe: false },
      orderBy: { order: 'asc' },
    })
  }
}

@Injectable()
@QueryHandler(GetProjectViewQuery)
export class GetProjectViewQueryHandler implements IQueryHandler<GetProjectViewQuery> {
  constructor(
    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,
  ) {}

  async execute({ projectViewId }: GetProjectViewQuery): Promise<ProjectViewEntity> {
    const projectView = await this.projectViewRepository.findById(projectViewId)
    if (!projectView) {
      throw new NotFoundException('Project view not found')
    }
    return projectView
  }
}
