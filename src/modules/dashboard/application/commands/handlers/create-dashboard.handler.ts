import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { DashboardEntity } from '../../../domain/entities/dashboard.entity'
import { DashboardPrismaRepository } from '../../../infrastructure/repositories/dashboard-prisma.repository'
import { CreateDashboardCommand } from '../dashboard.commands'

@CommandHandler(CreateDashboardCommand)
export class CreateDashboardCommandHandler implements ICommandHandler<CreateDashboardCommand> {
  constructor(private readonly dashboardRepository: DashboardPrismaRepository) {}

  async execute(command: CreateDashboardCommand): Promise<DashboardEntity> {
    const dashboard = DashboardEntity.create({
      title: command.title,
      projectId: command.projectId,
      isDefault: command.isDefault,
    })

    return await this.dashboardRepository.create(dashboard)
  }
}
