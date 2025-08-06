import { Module } from '@nestjs/common'

import { ReportPrismaRepository } from './infrastructure/repositories'

@Module({
  providers: [ReportPrismaRepository],
  exports: [ReportPrismaRepository],
})
export class ReportRepositoryModule {}
