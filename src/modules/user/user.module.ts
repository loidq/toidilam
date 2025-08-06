import { Module } from '@nestjs/common'

import { PrismaModule } from '@/infrastructure/prisma/prisma.module'
import { PasswordService } from '@/modules/auth/application/services/password.service'

import {
  AddPinnedProjectCommandHandler,
  ChangePasswordCommandHandler,
  RemovePinnedProjectCommandHandler,
  UpdatePinnedProjectsCommandHandler,
} from './application/commands/handlers'
import {
  GetPinnedProjectsQueryHandler,
  GetPinnedProjectsWithDetailsQueryHandler,
  GetUserByEmailQueryHandler,
  GetUserByIdQueryHandler,
} from './application/queries/handlers'
import { UserCacheService } from './application/services/user-cache.service'
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository'
import { UserController } from './presentation/controllers/user.controller'

const COMMAND_HANDLERS = [
  UpdatePinnedProjectsCommandHandler,
  AddPinnedProjectCommandHandler,
  RemovePinnedProjectCommandHandler,
  ChangePasswordCommandHandler,
]
const QUERY_HANDLERS = [
  GetUserByIdQueryHandler,
  GetUserByEmailQueryHandler,
  GetPinnedProjectsQueryHandler,
  GetPinnedProjectsWithDetailsQueryHandler,
]

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    UserPrismaRepository,
    UserCacheService,
    PasswordService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserPrismaRepository,
    },
  ],
  exports: ['USER_REPOSITORY', UserPrismaRepository, UserCacheService],
})
export class UserModule {}
