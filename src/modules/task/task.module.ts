import { Module } from '@nestjs/common'

// Command Handlers
import { ActivityRepositoryModule } from '../activity/activity-repository.module'
import { ProjectModule } from '../project'
import {
  CreateCommentCommandHandler,
  CreateTaskCommandHandler,
  CreateTaskPointCommandHandler,
  CreateTaskStatusCommandHandler,
  DeleteCommentCommandHandler,
  DeleteTaskCommandHandler,
  DeleteTaskPointCommandHandler,
  DeleteTaskStatusCommandHandler,
  UpdateCommentCommandHandler,
  UpdateTaskCommandHandler,
  UpdateTaskPointCommandHandler,
  UpdateTaskStatusCommandHandler,
  UpdateTaskStatusOrderCommandHandler,
} from './application/commands/handlers'
// Controllers
import {
  GetCommentByIdQueryHandler,
  GetCommentsQueryHandler,
  GetTaskByIdQueryHandler,
  GetTaskPointByIdQueryHandler,
  GetTaskPointsQueryHandler,
  GetTaskStatusByIdQueryHandler,
  GetTaskStatusesByProjectQueryHandler,
  GetTaskStatusesQueryHandler,
  GetTasksQueryHandler,
} from './application/queries/handlers'
import { TaskController, TaskPointController, TaskStatusController } from './presentation'
import { CommentController } from './presentation/controllers/comment.controller'
import { TaskRepositoryModule } from './task-repository.module'

const commandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
  CreateCommentCommandHandler,
  UpdateCommentCommandHandler,
  DeleteCommentCommandHandler,
  CreateTaskPointCommandHandler,
  UpdateTaskPointCommandHandler,
  DeleteTaskPointCommandHandler,
  CreateTaskStatusCommandHandler,
  UpdateTaskStatusCommandHandler,
  DeleteTaskStatusCommandHandler,
  UpdateTaskStatusOrderCommandHandler,
]
const queryHandlers = [
  GetTaskByIdQueryHandler,
  GetTasksQueryHandler,
  GetCommentsQueryHandler,
  GetCommentByIdQueryHandler,
  GetTaskPointsQueryHandler,
  GetTaskPointByIdQueryHandler,
  GetTaskStatusesQueryHandler,
  GetTaskStatusByIdQueryHandler,
  GetTaskStatusesByProjectQueryHandler,
]

@Module({
  imports: [TaskRepositoryModule, ProjectModule, ActivityRepositoryModule],
  controllers: [TaskController, CommentController, TaskPointController, TaskStatusController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class TaskModule {}
