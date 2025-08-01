import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { DashboardComponentEntity } from '../../../domain/entities/dashboard-component.entity'
import { DashboardComponentPrismaRepository } from '../../../infrastructure/repositories/dashboard-component-prisma.repository'
import { GetDashboardComponentByIdQuery } from '../dashboard.queries'

@QueryHandler(GetDashboardComponentByIdQuery)
export class GetDashboardComponentByIdQueryHandler
  implements IQueryHandler<GetDashboardComponentByIdQuery>
{
  constructor(private readonly dashboardComponentRepository: DashboardComponentPrismaRepository) {}

  async execute({
    dashboardcomponentId,
  }: GetDashboardComponentByIdQuery): Promise<DashboardComponentEntity> {
    const component = await this.dashboardComponentRepository.findById(dashboardcomponentId)

    if (!component) {
      throw new NotFoundException('Dashboard component not found')
    }

    return component
  }
}
