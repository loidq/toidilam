import { Module } from '@nestjs/common'

import { ProjectModule } from '../project'
import { TaskRepositoryModule } from '../task/task-repository.module'
import {
  CreateDashboardCommandHandler,
  CreateDashboardComponentCommandHandler,
  DeleteDashboardCommandHandler,
  DeleteDashboardComponentCommandHandler,
  UpdateDashboardCommandHandler,
  UpdateDashboardComponentCommandHandler,
} from './application/commands/handlers'
import {
  GetDashboardBurnChartQueryHandler,
  GetDashboardByIdQueryHandler,
  GetDashboardColumnQueryHandler,
  GetDashboardComponentByIdQueryHandler,
  GetDashboardComponentsQueryHandler,
  GetDashboardsQueryHandler,
  GetDashboardSummaryHandler,
} from './application/queries/handlers'
import { DashboardCacheService } from './application/services/dashboard-cache.service'
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
  GetDashboardSummaryHandler,
  GetDashboardBurnChartQueryHandler,
  GetDashboardColumnQueryHandler,
]

@Module({
  imports: [DashboardRepositoryModule, ProjectModule, TaskRepositoryModule],
  controllers: [DashboardController, DashboardComponentController],
  providers: [...commandHandlers, ...queryHandlers, DashboardCacheService],
  exports: [DashboardCacheService],
})
export class DashboardModule {}
