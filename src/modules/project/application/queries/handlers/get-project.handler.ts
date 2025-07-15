import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { GetProjectQuery } from '../project.queries'

@Injectable()
@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(query: GetProjectQuery): Promise<ProjectEntity> {
    const { id } = query

    const project = await this.projectRepository.findById(id)
    if (!project) {
      throw new NotFoundException('Project not found')
    }

    return project
  }
}
