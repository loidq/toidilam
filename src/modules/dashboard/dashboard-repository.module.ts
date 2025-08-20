import { Module } from '@nestjs/common'

import {
  DashboardComponentPrismaRepository,
  DashboardPrismaRepository,
} from './infrastructure/repositories'

@Module({
  providers: [DashboardPrismaRepository, DashboardComponentPrismaRepository],
  exports: [DashboardPrismaRepository, DashboardComponentPrismaRepository],
})
export class DashboardRepositoryModule {}
