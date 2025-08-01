import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { DashboardEntity } from '../../../domain/entities/dashboard.entity'
import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { GetDashboardByIdQuery } from '../dashboard.queries'

@QueryHandler(GetDashboardByIdQuery)
export class GetDashboardByIdQueryHandler implements IQueryHandler<GetDashboardByIdQuery> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute(query: GetDashboardByIdQuery): Promise<DashboardEntity> {
    const dashboard = await this.dashboardRepository.findById(query.dashboardId, {
      include: {
        dashboardComponents: true,
        project: true,
      },
    })

    if (!dashboard) {
      throw new NotFoundException('Dashboard not found')
    }

    return dashboard
  }
}
