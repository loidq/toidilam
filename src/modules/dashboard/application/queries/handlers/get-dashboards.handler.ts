import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { DashboardEntity } from '../../../domain/entities/dashboard.entity'
import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { GetDashboardsQuery } from '../dashboard.queries'

@QueryHandler(GetDashboardsQuery)
export class GetDashboardsQueryHandler implements IQueryHandler<GetDashboardsQuery> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute(query: GetDashboardsQuery): Promise<DashboardEntity[]> {
    const where: any = {}

    if (query.projectId) {
      where.projectId = query.projectId
    }

    if (query.isDefault !== undefined) {
      where.isDefault = query.isDefault
    }

    return await this.dashboardRepository.findMany({
      where,
      include: {
        dashboardComponents: true,
        project: true,
      },
      take: query.limit,
      skip: query.page && query.limit ? (query.page - 1) * query.limit : undefined,
    })
  }
}
