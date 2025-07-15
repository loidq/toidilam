import { Inject, Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { SearchProjectsQuery } from '../project.queries'

@Injectable()
@QueryHandler(SearchProjectsQuery)
export class SearchProjectsHandler implements IQueryHandler<SearchProjectsQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(query: SearchProjectsQuery): Promise<{ projects: ProjectEntity[]; total: number }> {
    const { searchTerm, organizationId, page, limit } = query

    const projects = await this.projectRepository.searchProjects(searchTerm, organizationId, {
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    const totalProjects = await this.projectRepository.searchProjects(searchTerm, organizationId)
    const total = totalProjects.length

    return { projects, total }
  }
}
