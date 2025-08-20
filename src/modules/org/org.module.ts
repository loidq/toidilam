import { Module } from '@nestjs/common'

import { UserPrismaRepository } from '@/modules/user/infrastructure/repositories/user-prisma.repository'

import {
  CreateOrgCommandHandler,
  InviteMemberByEmailCommandHandler,
  InviteOrgMemberCommandHandler,
  RespondOrgInvitationCommandHandler,
  UpdateOrgCommandHandler,
} from './application/commands/handlers'
import {
  GetOrgByIdQueryHandler,
  GetOrgBySlugQueryHandler,
  GetOrgInvitationsQueryHandler,
  GetOrgMembersQueryHandler,
  GetOrgsQueryHandler,
} from './application/queries/handlers/'
import { OrganizationRoleGuard } from './domain/guards'
import { OrgMemberPrismaRepository } from './infrastructure/repositories/org-member-prisma.repository'
import { OrgPrismaRepository } from './infrastructure/repositories/org-prisma.repository'
import { OrgMemberController } from './presentation/controllers/org-member.controller'
import { OrgController } from './presentation/controllers/org.controller'
const COMMAND_HANDLERS = [
  CreateOrgCommandHandler,
  InviteMemberByEmailCommandHandler,
  InviteOrgMemberCommandHandler,
  RespondOrgInvitationCommandHandler,
  UpdateOrgCommandHandler,
]
const QUERY_HANDLERS = [
  GetOrgByIdQueryHandler,
  GetOrgBySlugQueryHandler,
  GetOrgInvitationsQueryHandler,
  GetOrgMembersQueryHandler,
  GetOrgsQueryHandler,
]
@Module({
  imports: [],
  controllers: [OrgController, OrgMemberController],
  providers: [
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS,
    OrganizationRoleGuard,
    {
      provide: 'ORG_REPOSITORY',
      useClass: OrgPrismaRepository,
    },
    {
      provide: 'ORG_MEMBER_REPOSITORY',
      useClass: OrgMemberPrismaRepository,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UserPrismaRepository,
    },
  ],
  exports: [OrganizationRoleGuard, 'ORG_REPOSITORY'],
})
export class OrgModule {}
