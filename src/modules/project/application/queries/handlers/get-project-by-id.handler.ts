import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProjectEntity } from '../../../domain/entities/project.entity'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { GetProjectByIdQuery } from '../project.queries'

@Injectable()
@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdQueryHandler implements IQueryHandler<GetProjectByIdQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute({ projectId }: GetProjectByIdQuery): Promise<ProjectEntity> {
    const project = await this.projectRepository.findById(projectId, {
      include: {
        projectViews: true,
      },
    })
    if (!project || project.isDeleted) {
      throw new NotFoundException('Project not found')
    }

    return project
  }
}
