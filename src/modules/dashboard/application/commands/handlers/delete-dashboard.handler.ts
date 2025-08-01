import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { DeleteDashboardCommand } from '../dashboard.commands'

@CommandHandler(DeleteDashboardCommand)
export class DeleteDashboardCommandHandler implements ICommandHandler<DeleteDashboardCommand> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute({ dashboardId }: DeleteDashboardCommand): Promise<void> {
    const dashboard = await this.dashboardRepository.findById(dashboardId)
    if (!dashboard) {
      throw new NotFoundException('Dashboard not found')
    }

    await this.dashboardRepository.delete({ id: dashboardId })
  }
}
