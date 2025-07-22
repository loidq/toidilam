import { Module } from '@nestjs/common'

import { OrgPrismaRepository } from '@/modules/org/infrastructure/repositories/org-prisma.repository'

import {
  ArchiveProjectCommandHandler,
  CreateProjectCommandHandler,
  CreateProjectViewCommandHandler,
  DeleteProjectCommandHandler,
  DeleteProjectViewCommandHandler,
  UpdateProjectCommandHandler,
  UpdateProjectViewCommandHandler,
} from './application/commands/handlers'
import {
  GetMembersQueryHandler,
  GetProjectByIdQueryHandler,
  GetProjectsByUserQueryHandler,
  GetProjectsQueryHandler,
  GetProjectViewQueryHandler,
  GetProjectViewsQueryHandler,
  SearchProjectsQueryHandler,
} from './application/queries/handlers'
import { ProjectPrismaRepository } from './infrastructure/repositories/project-prisma.repository'
import { ProjectViewPrismaRepository } from './infrastructure/repositories/project-view-prisma.repository'
import { MemberController } from './presentation/controllers/member.controller'
import { ProjectController } from './presentation/controllers/project.controller'

const COMMAND_HANDLERS = [
  CreateProjectCommandHandler,
  DeleteProjectCommandHandler,
  UpdateProjectCommandHandler,
  ArchiveProjectCommandHandler,
  // ProjectView handlers
  CreateProjectViewCommandHandler,
  UpdateProjectViewCommandHandler,
  DeleteProjectViewCommandHandler,
]

const QUERY_HANDLERS = [
  GetProjectByIdQueryHandler,
  GetProjectsByUserQueryHandler,
  GetProjectsQueryHandler,
  GetProjectViewsQueryHandler,
  GetProjectViewQueryHandler,
  SearchProjectsQueryHandler,

  //Member handlers
  GetMembersQueryHandler,
  // ProjectView handlers
]

@Module({
  imports: [],
  controllers: [ProjectController, MemberController],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: 'PROJECT_REPOSITORY',
      useClass: ProjectPrismaRepository,
    },
    {
      provide: 'PROJECT_VIEW_REPOSITORY',
      useClass: ProjectViewPrismaRepository,
    },
    {
      provide: 'ORG_REPOSITORY',
      useClass: OrgPrismaRepository,
    },
  ],
  exports: ['PROJECT_REPOSITORY', 'PROJECT_VIEW_REPOSITORY'],
})
export class ProjectModule {}
