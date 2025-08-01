import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { TaskIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  AddTaskTagCommand,
  AssignTaskCommand,
  CreateTaskCommand,
  DeleteTaskCommand,
  RemoveTaskTagCommand,
  UnassignTaskCommand,
  UpdateTaskCommand,
  UpdateTaskProgressCommand,
} from '../../application/commands'
import {
  AddTaskTagDto,
  AssignTaskDto,
  CreateTaskDto,
  RemoveTaskTagDto,
  TaskListQueryDto,
  UnassignTaskDto,
  UpdateTaskDto,
  UpdateTaskProgressDto,
} from '../../application/dtos'
import { GetTaskByIdQuery, GetTasksQuery } from '../../application/queries'

@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const {
      title,
      projectId,
      order,
      desc,
      dueDate,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      taskPoint,
      customFields,
      assigneeIds,
      tagIds,
      cover,
      plannedStartDate,
      plannedDueDate,
      startDate,
    } = createTaskDto

    const command = new CreateTaskCommand({
      title,
      projectId,
      createdBy: userId,
      order,
      desc,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      taskPoint,
      customFields,
      assigneeIds,
      tagIds,
      cover,
      plannedStartDate: plannedStartDate ? new Date(plannedStartDate) : undefined,
      plannedDueDate: plannedDueDate ? new Date(plannedDueDate) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
    })

    const task = await this.commandBus.execute(command)
    return this.responseBuilder.created(task, 'Task created successfully')
  }

  @Put(':taskId')
  async updateTask(
    @Param() { taskId }: TaskIdDto,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const {
      title,
      desc,
      dueDate,
      order,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      progress,
      done,
      taskPoint,
      customFields,
      cover,
      plannedStartDate,
      plannedDueDate,
      startDate,
    } = updateTaskDto

    const command = new UpdateTaskCommand({
      taskId,
      updatedBy: userId,
      title,
      desc,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      order,
      type,
      priority,
      taskStatusId,
      parentTaskId,
      progress,
      done,
      taskPoint,
      customFields,
      cover,
      plannedStartDate: plannedStartDate ? new Date(plannedStartDate) : undefined,
      plannedDueDate: plannedDueDate ? new Date(plannedDueDate) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
    })

    const task = await this.commandBus.execute(command)
    return this.responseBuilder.success(task, 'Task updated successfully')
  }

  @Get()
  async getTaskList(@Query() queryDto: TaskListQueryDto): Promise<any> {
    const {
      projectId,
      assigneeId,
      statusId,
      parentTaskId,
      priority,
      type,
      done,
      search,
      dueDateFrom,
      dueDateTo,
      page,
      limit,
    } = queryDto

    const query = new GetTasksQuery({
      projectId,
      assigneeId,
      statusId,
      parentTaskId,
      priority,
      type,
      done,
      search,
      dueDateFrom: dueDateFrom ? new Date(dueDateFrom) : undefined,
      dueDateTo: dueDateTo ? new Date(dueDateTo) : undefined,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { tasks, total } = result as { tasks: any[]; total: number }

    return this.responseBuilder.success(tasks, 'Tasks retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':taskId')
  async getTask(@Param() { taskId }: TaskIdDto): Promise<any> {
    const query = new GetTaskByIdQuery(taskId)
    const task = await this.queryBus.execute(query)
    return this.responseBuilder.success(task, 'Task retrieved successfully')
  }

  @Delete(':taskId')
  async deleteTask(@Param() { taskId }: TaskIdDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteTaskCommand({ taskId, deletedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Task deleted successfully')
  }

  @Patch(':taskId/assign')
  async assignTask(
    @Param() { taskId }: TaskIdDto,
    @Body() { userIds }: AssignTaskDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new AssignTaskCommand({ taskId, userIds, assignedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Users assigned to task successfully')
  }

  @Patch(':taskId/unassign')
  async unassignTask(
    @Param() { taskId }: TaskIdDto,
    @Body() { userIds }: UnassignTaskDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new UnassignTaskCommand({ taskId, userIds, unassignedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Users unassigned from task successfully')
  }

  @Patch(':taskId/tags/add')
  async addTaskTags(
    @Param() { taskId }: TaskIdDto,
    @Body() { tagIds }: AddTaskTagDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new AddTaskTagCommand({ taskId, tagIds, addedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Tags added to task successfully')
  }

  @Patch(':taskId/tags/remove')
  async removeTaskTags(
    @Param() { taskId }: TaskIdDto,
    @Body() { tagIds }: RemoveTaskTagDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new RemoveTaskTagCommand({ taskId, tagIds, removedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Tags removed from task successfully')
  }

  @Patch(':taskId/progress')
  async updateTaskProgress(
    @Param() { taskId }: TaskIdDto,
    @Body() { progress }: UpdateTaskProgressDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new UpdateTaskProgressCommand({ taskId, progress, updatedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Task progress updated successfully')
  }
}
