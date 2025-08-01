import { Module } from '@nestjs/common'

// Command Handlers
import { ProjectModule } from '../project'
import {
  CreateTaskAutomationCommandHandler,
  DeleteTaskAutomationCommandHandler,
  UpdateTaskAutomationCommandHandler,
} from './application/commands/handlers/index'
// Controllers
import {
  GetTaskAutomationByIdQueryHandler,
  GetTaskAutomationsQueryHandler,
} from './application/queries/handlers/index'
import { AutomationRepositoryModule } from './automation-repository.module'
import { TaskAutomationController } from './presentation/index'

const commandHandlers = [
  CreateTaskAutomationCommandHandler,
  UpdateTaskAutomationCommandHandler,
  DeleteTaskAutomationCommandHandler,
]
const queryHandlers = [GetTaskAutomationByIdQueryHandler, GetTaskAutomationsQueryHandler]

@Module({
  imports: [AutomationRepositoryModule, ProjectModule],
  controllers: [TaskAutomationController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class AutomationModule {}
