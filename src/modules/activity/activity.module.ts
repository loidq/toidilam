import { Module } from '@nestjs/common'

import { ActivityRepositoryModule } from './activity-repository.module'
import {
  BulkCreateActivitiesCommandHandler,
  CreateActivityCommandHandler,
  DeleteActivityCommandHandler,
  UpdateActivityCommandHandler,
} from './application/commands/handlers'
import {
  GetActivitiesByTargetQueryHandler,
  GetActivitiesQueryHandler,
  GetActivityByIdQueryHandler,
} from './application/queries/handlers'
import { ActivityController } from './presentation/controllers/activity.controller'

@Module({
  imports: [ActivityRepositoryModule],
  controllers: [ActivityController],
  providers: [
    // Command Handlers
    CreateActivityCommandHandler,
    UpdateActivityCommandHandler,
    DeleteActivityCommandHandler,
    BulkCreateActivitiesCommandHandler,

    // Query Handlers
    GetActivitiesQueryHandler,
    GetActivityByIdQueryHandler,
    GetActivitiesByTargetQueryHandler,
  ],
  exports: [],
})
export class ActivityModule {}
