import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ReportPrismaRepository } from '../../../infrastructure/repositories'
import { GetMemberReportQuery } from '../get-member-report.query'

@Injectable()
@QueryHandler(GetMemberReportQuery)
export class GetMemberReportQueryHandler implements IQueryHandler<GetMemberReportQuery> {
  constructor(private readonly reportRepository: ReportPrismaRepository) {}

  async execute({ startDate, endDate, projectIds, memberId }: GetMemberReportQuery): Promise<any> {
    return await this.reportRepository.getMemberReport(startDate, endDate, projectIds, memberId)
  }
}
