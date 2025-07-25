import { Module } from '@nestjs/common'

import { OrgMemberPrismaRepository } from '@/modules/org/infrastructure/repositories/org-member-prisma.repository'
import { OrgPrismaRepository } from '@/modules/org/infrastructure/repositories/org-prisma.repository'

import {
  // Member handlers
  AddMemberCommandHandler,
  //
  ArchiveProjectCommandHandler,
  CreateProjectCommandHandler,
  CreateProjectViewCommandHandler,
  DeleteProjectCommandHandler,
  DeleteProjectViewCommandHandler,
  RemoveMemberCommandHandler,
  UpdateMemberRoleCommandHandler,
  UpdateProjectCommandHandler,
  UpdateProjectViewCommandHandler,
} from './application/commands/handlers'
import {
  GetMembersQueryHandler,
  GetProjectByIdQueryHandler,
  GetProjectsQueryHandler,
  GetProjectViewQueryHandler,
  GetProjectViewsQueryHandler,
  SearchProjectsQueryHandler,
} from './application/queries/handlers'
import { MemberPrismaRepository } from './infrastructure/repositories/member-prisma.repository'
import { ProjectPrismaRepository } from './infrastructure/repositories/project-prisma.repository'
import { ProjectViewPrismaRepository } from './infrastructure/repositories/project-view-prisma.repository'
import { MemberController } from './presentation/controllers/member.controller'
import { ProjectController } from './presentation/controllers/project.controller'
const COMMAND_HANDLERS = [
  CreateProjectCommandHandler,
  DeleteProjectCommandHandler,
  UpdateProjectCommandHandler,
  ArchiveProjectCommandHandler,
  // Member handlers
  AddMemberCommandHandler,
  UpdateMemberRoleCommandHandler,
  RemoveMemberCommandHandler,
  // UpdateMemberRoleHandler,
  // RemoveMemberHandler,
  // ProjectView handlers
  CreateProjectViewCommandHandler,
  UpdateProjectViewCommandHandler,
  DeleteProjectViewCommandHandler,
]

const QUERY_HANDLERS = [
  GetProjectByIdQueryHandler,
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
      provide: 'MEMBER_REPOSITORY',
      useClass: MemberPrismaRepository,
    },

    {
      provide: 'ORG_REPOSITORY',
      useClass: OrgPrismaRepository,
    },
    {
      provide: 'ORG_MEMBER_REPOSITORY',
      useClass: OrgMemberPrismaRepository,
    },
  ],
  exports: ['PROJECT_REPOSITORY', 'PROJECT_VIEW_REPOSITORY', 'MEMBER_REPOSITORY'],
})
export class ProjectModule {}
