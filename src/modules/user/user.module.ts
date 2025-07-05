import { Module } from '@nestjs/common'

import { GetCurrentUserHandler } from './application/queries/handlers'
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository'
import { UserController } from './presentation/controllers/user.controller'

const COMMAND_HANDLERS = []
const QUERY_HANDLERS = [GetCurrentUserHandler]
@Module({
  controllers: [UserController],
  providers: [
    // ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserPrismaRepository,
    },
  ],
  exports: ['USER_REPOSITORY'],
})
export class UserModule {}
