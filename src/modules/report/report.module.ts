import { Module } from '@nestjs/common'

import {
  GetMemberReportQueryHandler,
  GetProjectReportQueryHandler,
} from './application/queries/handlers'
import { ReportCacheService } from './application/services/report-cache.service'
import { ReportController } from './presentation'
import { ReportRepositoryModule } from './report-repository.module'

const queryHandlers = [GetProjectReportQueryHandler, GetMemberReportQueryHandler]

@Module({
  imports: [ReportRepositoryModule],
  controllers: [ReportController],
  providers: [...queryHandlers, ReportCacheService],
  exports: [ReportCacheService],
})
export class ReportModule {}
