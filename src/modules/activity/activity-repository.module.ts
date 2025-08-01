import { Module } from '@nestjs/common'

import { ActivityPrismaRepository } from './infrastructure/repositories'

@Module({
  providers: [ActivityPrismaRepository],
  exports: [ActivityPrismaRepository],
})
export class ActivityRepositoryModule {}
