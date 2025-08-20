import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ReportPrismaRepository } from '../../../infrastructure/repositories'
import { ReportCacheService } from '../../services/report-cache.service'
import { GetProjectReportQuery } from '../get-project-report.query'

@Injectable()
@QueryHandler(GetProjectReportQuery)
export class GetProjectReportQueryHandler implements IQueryHandler<GetProjectReportQuery> {
  constructor(
    private readonly reportRepository: ReportPrismaRepository,
    private readonly reportCacheService: ReportCacheService,
  ) {}

  async execute({ projectIds, startDate, endDate }: GetProjectReportQuery): Promise<any> {
    // Create cache params
    const cacheParams = {
      projectIds,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }

    // Try to get from cache first
    const cachedResult = await this.reportCacheService.getCachedProjectReport(cacheParams)
    if (cachedResult) {
      return cachedResult
    }

    // If not in cache, execute query
    const result = await this.reportRepository.getProjectReport(projectIds, startDate, endDate)

    // Cache the result
    await this.reportCacheService.cacheProjectReport(cacheParams, result)

    return result
  }
}
