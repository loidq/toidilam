import { Module } from '@nestjs/common'

import { ProjectModule } from '../project'
import {
  CreateVisionCommandHandler,
  DeleteVisionCommandHandler,
  UpdateVisionCommandHandler,
} from './application/commands/handlers'
import {
  GetVisionByIdQueryHandler,
  GetVisionsByOrgIdQueryHandler,
  GetVisionsQueryHandler,
} from './application/queries/handlers'
import { VisionController } from './presentation'
import { VisionRepositoryModule } from './vision-repository.module'

const commandHandlers = [
  CreateVisionCommandHandler,
  UpdateVisionCommandHandler,
  DeleteVisionCommandHandler,
]

const queryHandlers = [
  GetVisionByIdQueryHandler,
  GetVisionsQueryHandler,
  GetVisionsByOrgIdQueryHandler,
]

@Module({
  imports: [VisionRepositoryModule, ProjectModule],
  controllers: [VisionController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class VisionModule {}
