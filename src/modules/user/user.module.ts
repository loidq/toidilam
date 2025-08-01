import { Module } from '@nestjs/common'

import { GetUserByIdQueryHandler } from './application/queries/handlers'
import { UserPrismaRepository } from './infrastructure/repositories/user-prisma.repository'
import { UserController } from './presentation/controllers/user.controller'

const COMMAND_HANDLERS = []
const QUERY_HANDLERS = [GetUserByIdQueryHandler]
@Module({
  imports: [],
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
