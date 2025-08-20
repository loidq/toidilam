import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ReportPrismaRepository } from '../../../infrastructure/repositories'
import { ReportCacheService } from '../../services/report-cache.service'
import { GetMemberReportQuery } from '../get-member-report.query'

@Injectable()
@QueryHandler(GetMemberReportQuery)
export class GetMemberReportQueryHandler implements IQueryHandler<GetMemberReportQuery> {
  constructor(
    private readonly reportRepository: ReportPrismaRepository,
    private readonly reportCacheService: ReportCacheService,
  ) {}

  async execute({ startDate, endDate, projectIds, memberId }: GetMemberReportQuery): Promise<any> {
    // Create cache params
    const cacheParams = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      projectIds,
      memberId,
    }

    // Try to get from cache first
    const cachedResult = await this.reportCacheService.getCachedMemberReport(cacheParams)
    if (cachedResult) {
      return cachedResult
    }

    // If not in cache, execute query
    const result = await this.reportRepository.getMemberReport(
      startDate,
      endDate,
      projectIds,
      memberId,
    )

    // Cache the result
    await this.reportCacheService.cacheMemberReport(cacheParams, result)

    return result
  }
}
