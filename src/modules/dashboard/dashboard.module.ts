import { Module } from '@nestjs/common'

import { ProjectModule } from '../project'
import {
  CreateDashboardCommandHandler,
  CreateDashboardComponentCommandHandler,
  DeleteDashboardCommandHandler,
  DeleteDashboardComponentCommandHandler,
  UpdateDashboardCommandHandler,
  UpdateDashboardComponentCommandHandler,
} from './application/commands/handlers'
import {
  GetDashboardByIdQueryHandler,
  GetDashboardComponentByIdQueryHandler,
  GetDashboardComponentsQueryHandler,
  GetDashboardsQueryHandler,
} from './application/queries/handlers'
import { DashboardRepositoryModule } from './dashboard-repository.module'
import { DashboardComponentController, DashboardController } from './presentation'

const commandHandlers = [
  CreateDashboardCommandHandler,
  UpdateDashboardCommandHandler,
  DeleteDashboardCommandHandler,
  CreateDashboardComponentCommandHandler,
  UpdateDashboardComponentCommandHandler,
  DeleteDashboardComponentCommandHandler,
]

const queryHandlers = [
  GetDashboardByIdQueryHandler,
  GetDashboardsQueryHandler,
  GetDashboardComponentByIdQueryHandler,
  GetDashboardComponentsQueryHandler,
]

@Module({
  imports: [DashboardRepositoryModule, ProjectModule],
  controllers: [DashboardController, DashboardComponentController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class DashboardModule {}
