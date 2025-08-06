import { Module } from '@nestjs/common'

import {
  GetMemberReportQueryHandler,
  GetProjectReportQueryHandler,
} from './application/queries/handlers'
import { ReportController } from './presentation'
import { ReportRepositoryModule } from './report-repository.module'

const queryHandlers = [GetProjectReportQueryHandler, GetMemberReportQueryHandler]

@Module({
  imports: [ReportRepositoryModule],
  controllers: [ReportController],
  providers: [...queryHandlers],
  exports: [],
})
export class ReportModule {}
