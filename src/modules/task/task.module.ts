import { Module } from '@nestjs/common'

// Command Handlers
import { ActivityRepositoryModule } from '../activity/activity-repository.module'
import { ProjectModule } from '../project'
import {
  CreateCommentCommandHandler,
  CreateTaskChecklistCommandHandler,
  CreateTaskCommandHandler,
  CreateTaskPointCommandHandler,
  CreateTaskStatusCommandHandler,
  DeleteCommentCommandHandler,
  DeleteTaskChecklistCommandHandler,
  DeleteTaskCommandHandler,
  DeleteTaskPointCommandHandler,
  DeleteTaskStatusCommandHandler,
  UpdateCommentCommandHandler,
  UpdateTaskChecklistCommandHandler,
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
  GetTaskChecklistByIdQueryHandler,
  GetTaskChecklistsByTaskQueryHandler,
  GetTaskPointByIdQueryHandler,
  GetTaskPointsQueryHandler,
  GetTaskStatusByIdQueryHandler,
  GetTaskStatusesByProjectQueryHandler,
  GetTaskStatusesQueryHandler,
  GetTasksQueryHandler,
} from './application/queries/handlers'
import {
  TaskChecklistController,
  TaskController,
  TaskPointController,
  TaskStatusController,
} from './presentation'
import { CommentController } from './presentation/controllers/comment.controller'
import { TaskRepositoryModule } from './task-repository.module'

const commandHandlers = [
  CreateTaskCommandHandler,
  UpdateTaskCommandHandler,
  DeleteTaskCommandHandler,
  CreateCommentCommandHandler,
  UpdateCommentCommandHandler,
  DeleteCommentCommandHandler,
  CreateTaskChecklistCommandHandler,
  UpdateTaskChecklistCommandHandler,
  DeleteTaskChecklistCommandHandler,
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
  GetTaskChecklistByIdQueryHandler,
  GetTaskChecklistsByTaskQueryHandler,
  GetTaskPointsQueryHandler,
  GetTaskPointByIdQueryHandler,
  GetTaskStatusesQueryHandler,
  GetTaskStatusByIdQueryHandler,
  GetTaskStatusesByProjectQueryHandler,
]

@Module({
  imports: [TaskRepositoryModule, ProjectModule, ActivityRepositoryModule],
  controllers: [
    TaskController,
    CommentController,
    TaskChecklistController,
    TaskPointController,
    TaskStatusController,
  ],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class TaskModule {}
