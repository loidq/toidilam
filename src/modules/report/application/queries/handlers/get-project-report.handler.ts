import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ReportPrismaRepository } from '../../../infrastructure/repositories'
import { GetProjectReportQuery } from '../get-project-report.query'

@Injectable()
@QueryHandler(GetProjectReportQuery)
export class GetProjectReportQueryHandler implements IQueryHandler<GetProjectReportQuery> {
  constructor(private readonly reportRepository: ReportPrismaRepository) {}

  async execute({ projectIds, startDate, endDate }: GetProjectReportQuery): Promise<any> {
    return await this.reportRepository.getProjectReport(projectIds, startDate, endDate)
  }
}
