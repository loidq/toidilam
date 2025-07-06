import { Module } from '@nestjs/common'

import { UserPrismaRepository } from '@/modules/user/infrastructure/repositories/user-prisma.repository'

import {
  CreateOrgHandler,
  InviteMemberByEmailHandler,
  InviteMemberHandler,
  RespondInvitationHandler,
  UpdateOrgHandler,
} from './application/commands/handlers'
import {
  GetAllOrgsQueryHandler,
  GetOrgQueryHandler,
  GetUserInvitationsQueryHandler,
} from './application/queries/handlers/'
import { OrgPrismaRepository } from './infrastructure/repositories/org-prisma.repository'
import { OrgMemberPrismaRepository } from './infrastructure/repositories/orgMember-prisma.repository'
import { OrgController } from './presentation/controllers/org.controller'
const COMMAND_HANDLERS = [
  CreateOrgHandler,
  UpdateOrgHandler,
  InviteMemberHandler,
  InviteMemberByEmailHandler,
  RespondInvitationHandler,
]
const QUERY_HANDLERS = [GetOrgQueryHandler, GetAllOrgsQueryHandler, GetUserInvitationsQueryHandler]
@Module({
  imports: [],
  controllers: [OrgController],
  providers: [
    ...QUERY_HANDLERS,
    ...COMMAND_HANDLERS,
    // OrgMemberPrismaRepository,
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
  exports: [],
})
export class OrgModule {}
