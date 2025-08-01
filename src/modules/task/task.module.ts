import { Module } from '@nestjs/common'

// Command Handlers
import { ActivityRepositoryModule } from '../activity/activity-repository.module'
import { ProjectModule } from '../project'
import {
  CreateCommentCommandHandler,
  CreateTaskCommandHandler,
  DeleteCommentCommandHandler,
  DeleteTaskCommandHandler,
  UpdateCommentCommandHandler,
  UpdateTaskCommandHandler,
} from './application/commands/handlers'
// Controllers
import {
  GetCommentByIdQueryHandler,
  GetCommentsQueryHandler,
  GetTaskByIdQueryHandler,
  GetTasksQueryHandler,
} from './application/queries/handlers'
import { TaskController } from './presentation'
import { CommentController } from './presentation/controllers/comment.controller'
import { TaskRepositoryModule } from './task-repository.module'

const commandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
  CreateCommentCommandHandler,
  UpdateCommentCommandHandler,
  DeleteCommentCommandHandler,
]
const queryHandlers = [
  GetTaskByIdQueryHandler,
  GetTasksQueryHandler,
  GetCommentsQueryHandler,
  GetCommentByIdQueryHandler,
]

@Module({
  imports: [TaskRepositoryModule, ProjectModule, ActivityRepositoryModule],
  controllers: [TaskController, CommentController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class TaskModule {}
