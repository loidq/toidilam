import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardComponentEntity } from '../../../domain/entities/dashboard-component.entity'
import { DashboardComponentPrismaRepository } from '../../../infrastructure/repositories/dashboard-component-prisma.repository'
import { UpdateDashboardComponentCommand } from '../dashboard.commands'

@CommandHandler(UpdateDashboardComponentCommand)
export class UpdateDashboardComponentCommandHandler
  implements ICommandHandler<UpdateDashboardComponentCommand>
{
  constructor(private readonly dashboardComponentRepository: DashboardComponentPrismaRepository) {}

  async execute(command: UpdateDashboardComponentCommand): Promise<DashboardComponentEntity> {
    const component = await this.dashboardComponentRepository.findById(command.dashboardComponentId)
    if (!component) {
      throw new NotFoundException('Dashboard component not found')
    }

    component.update({
      title: command.title,
      type: command.type as any,
      config: command.config,
      x: command.x,
      y: command.y,
      width: command.width,
      height: command.height,
      updatedBy: command.updatedBy,
    })

    return await this.dashboardComponentRepository.update(
      { id: command.dashboardComponentId },
      component,
    )
  }
}
