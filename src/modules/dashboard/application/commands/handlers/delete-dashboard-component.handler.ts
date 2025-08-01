import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardComponentPrismaRepository } from '../../../infrastructure/repositories/dashboard-component-prisma.repository'
import { DeleteDashboardComponentCommand } from '../dashboard.commands'

@CommandHandler(DeleteDashboardComponentCommand)
export class DeleteDashboardComponentCommandHandler
  implements ICommandHandler<DeleteDashboardComponentCommand>
{
  constructor(private readonly dashboardComponentRepository: DashboardComponentPrismaRepository) {}

  async execute({ dashboardComponentId }: DeleteDashboardComponentCommand): Promise<void> {
    const component = await this.dashboardComponentRepository.findById(dashboardComponentId)
    if (!component) {
      throw new NotFoundException('Dashboard component not found')
    }

    await this.dashboardComponentRepository.delete({ id: dashboardComponentId })
  }
}
