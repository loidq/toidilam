import { Module } from '@nestjs/common'

import { OrgPrismaRepository } from '../org/infrastructure/repositories/org-prisma.repository'
import {
  ArchiveProjectHandler,
  CreateProjectHandler,
  DeleteProjectHandler,
  UnarchiveProjectHandler,
  UpdateProjectHandler,
} from './application/commands/handlers'
import {
  GetProjectHandler,
  GetProjectsByOrganizationHandler,
  GetUserProjectsHandler,
  SearchProjectsHandler,
} from './application/queries/handlers'
import { ProjectPrismaRepository } from './infrastructure/repositories/project-prisma.repository'
import { ProjectController } from './presentation/controllers/project.controller'

const COMMAND_HANDLERS = [
  CreateProjectHandler,
  UpdateProjectHandler,
  DeleteProjectHandler,
  ArchiveProjectHandler,
  UnarchiveProjectHandler,
]

const QUERY_HANDLERS = [
  GetProjectHandler,
  GetProjectsByOrganizationHandler,
  SearchProjectsHandler,
  GetUserProjectsHandler,
]

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectPrismaRepository,
    },
    {
      provide: 'ORG_REPOSITORY',
      useClass: OrgPrismaRepository,
    },
  ],
  exports: ['PROJECT_REPOSITORY'],
})
export class ProjectModule {}
