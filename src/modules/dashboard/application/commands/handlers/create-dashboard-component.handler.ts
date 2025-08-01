import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardComponentEntity } from '../../../domain/entities/dashboard-component.entity'
import { DashboardComponentType } from '../../../domain/enums/dashboard-component-type.enum'
import { DashboardComponentPrismaRepository } from '../../../infrastructure/repositories/dashboard-component-prisma.repository'
import { CreateDashboardComponentCommand } from '../dashboard.commands'
@CommandHandler(CreateDashboardComponentCommand)
export class CreateDashboardComponentCommandHandler
  implements ICommandHandler<CreateDashboardComponentCommand>
{
  constructor(private readonly dashboardComponentRepository: DashboardComponentPrismaRepository) {}

  async execute({
    dashboardId,
    title,
    type,
    config,
    x,
    y,
    width,
    height,
    createdBy,
  }: CreateDashboardComponentCommand): Promise<DashboardComponentEntity> {
    const defaultDimensions =
      type === DashboardComponentType.COLUMN ? { width: 6, height: 4 } : { width: 3, height: 1 }

    const component = DashboardComponentEntity.create({
      dashboardId: dashboardId,
      title: title,
      type,
      config,
      x: 0,
      y: 0,
      ...defaultDimensions,
      createdBy,
    })

    return await this.dashboardComponentRepository.create(component)
  }
}
