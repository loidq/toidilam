import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { DashboardComponentEntity } from '../../../domain/entities/dashboard-component.entity'
import { DashboardComponentPrismaRepository } from '../../../infrastructure/repositories/dashboard-component-prisma.repository'
import { GetDashboardComponentsQuery } from '../dashboard.queries'

@QueryHandler(GetDashboardComponentsQuery)
export class GetDashboardComponentsQueryHandler
  implements IQueryHandler<GetDashboardComponentsQuery>
{
  constructor(private readonly dashboardComponentRepository: DashboardComponentPrismaRepository) {}

  async execute(query: GetDashboardComponentsQuery): Promise<DashboardComponentEntity[]> {
    const where: any = {}

    if (query.dashboardId) {
      where.dashboardId = query.dashboardId
    }

    if (query.type) {
      where.type = query.type
    }

    return await this.dashboardComponentRepository.findMany({
      where,
      take: query.limit,
      skip: query.page && query.limit ? (query.page - 1) * query.limit : undefined,
    })
  }
}
