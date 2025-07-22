import { Inject, Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { GetProjectsQuery } from '../project.queries'

@Injectable()
@QueryHandler(GetProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetProjectsQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(query: GetProjectsQuery): Promise<{ projects: ProjectEntity[]; total: number }> {
    const { organizationId, isArchived, page, limit } = query

    let projects: ProjectEntity[]
    if (isArchived) {
      projects = await this.projectRepository.findByOrganizationId(organizationId, {
        where: { isDeleted: false },
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    } else
      projects = await this.projectRepository.findByOrganizationId(organizationId, {
        where: { isArchived: false, isDeleted: false },
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })

    const total = await this.projectRepository.countByOrganization(
      organizationId,
      isArchived ? {} : { where: { isArchived: false } },
    )

    return { projects, total }
  }
}
