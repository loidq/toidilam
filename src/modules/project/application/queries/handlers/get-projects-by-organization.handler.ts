import { Inject, Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { GetProjectsByOrganizationQuery } from '../project.queries'

@Injectable()
@QueryHandler(GetProjectsByOrganizationQuery)
export class GetProjectsByOrganizationHandler
  implements IQueryHandler<GetProjectsByOrganizationQuery>
{
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(
    query: GetProjectsByOrganizationQuery,
  ): Promise<{ projects: ProjectEntity[]; total: number }> {
    const { organizationId, includeArchived, page, limit } = query

    let projects: ProjectEntity[]

    if (includeArchived) {
      projects = await this.projectRepository.findByOrganizationId(organizationId, {
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    } else {
      projects = await this.projectRepository.findActiveProjects(organizationId, {
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    }

    const total = await this.projectRepository.countByOrganization(organizationId)

    return { projects, total }
  }
}
