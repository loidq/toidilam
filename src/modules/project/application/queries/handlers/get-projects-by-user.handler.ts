import { Inject, Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { GetProjectsByUserQuery } from '../project.queries'

@Injectable()
@QueryHandler(GetProjectsByUserQuery)
export class GetProjectsByUserQueryHandler implements IQueryHandler<GetProjectsByUserQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(
    query: GetProjectsByUserQuery,
  ): Promise<{ projects: ProjectEntity[]; total: number }> {
    const { userId, organizationId, page, limit } = query

    const projects = await this.projectRepository.getUserProjectsByRole(userId, organizationId)

    const paginatedProjects =
      page && limit ? projects.slice((page - 1) * limit, page * limit) : projects

    const total = projects.length

    return { projects: paginatedProjects, total }
  }
}
