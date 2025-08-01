import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardEntity } from '../../../domain/entities/dashboard.entity'
import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { UpdateDashboardCommand } from '../dashboard.commands'

@CommandHandler(UpdateDashboardCommand)
export class UpdateDashboardCommandHandler implements ICommandHandler<UpdateDashboardCommand> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute(command: UpdateDashboardCommand): Promise<DashboardEntity> {
    const dashboard = await this.dashboardRepository.findById(command.dashboardId)
    if (!dashboard) {
      throw new NotFoundException('Dashboard not found')
    }

    dashboard.update({
      title: command.title,
      isDefault: command.isDefault,
    })

    return await this.dashboardRepository.update({ id: command.dashboardId }, dashboard)
  }
}
