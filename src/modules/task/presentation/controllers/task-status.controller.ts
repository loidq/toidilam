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
import { TaskStatusIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateTaskStatusCommand,
  DeleteTaskStatusCommand,
  UpdateTaskStatusCommand,
  UpdateTaskStatusOrderCommand,
} from '../../application/commands/task-status.commands'
import {
  CreateTaskStatusDto,
  TaskStatusListQueryDto,
  UpdateTaskStatusDto,
  UpdateTaskStatusOrderDto,
} from '../../application/dtos/task-status.dto'
import {
  GetTaskStatusByIdQuery,
  GetTaskStatusesQuery,
} from '../../application/queries/task-status.queries'

@ApiTags('TaskStatus')
@ApiBearerAuth()
@Controller('task-status')
@UseGuards(JwtAuthGuard)
export class TaskStatusController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createTaskStatus(
    @Body() createTaskStatusDto: CreateTaskStatusDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, color, order, projectId, type } = createTaskStatusDto

    const command = new CreateTaskStatusCommand({
      name,
      color,
      order,
      projectId,
      type,
      createdBy: userId,
    })

    const taskStatus = await this.commandBus.execute(command)
    return this.responseBuilder.created(taskStatus, 'TaskStatus created successfully')
  }

  @Put(':statusId')
  async updateTaskStatus(
    @Param() { statusId }: TaskStatusIdDto,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, color, order, type } = updateTaskStatusDto

    const command = new UpdateTaskStatusCommand({
      statusId,
      name,
      color,
      order,
      type,
      updatedBy: userId,
    })

    const taskStatus = await this.commandBus.execute(command)
    return this.responseBuilder.success(taskStatus, 'TaskStatus updated successfully')
  }

  @Patch('update-order')
  async updateTaskStatusOrder(
    @Body() updateTaskStatusOrderDto: UpdateTaskStatusOrderDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { statusOrders } = updateTaskStatusOrderDto

    const command = new UpdateTaskStatusOrderCommand({
      statusOrders,
      updatedBy: userId,
    })

    const taskStatuses = await this.commandBus.execute(command)
    return this.responseBuilder.success(taskStatuses, 'TaskStatus order updated successfully')
  }

  @Get()
  async getTaskStatusList(@Query() queryDto: TaskStatusListQueryDto): Promise<any> {
    const { projectId, page, limit } = queryDto

    const query = new GetTaskStatusesQuery({
      projectId,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { taskStatuses, total } = result as { taskStatuses: any[]; total: number }

    return this.responseBuilder.success(taskStatuses, 'TaskStatuses retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':statusId')
  async getTaskStatus(@Param() { statusId }: TaskStatusIdDto): Promise<any> {
    const query = new GetTaskStatusByIdQuery(statusId)
    const taskStatus = await this.queryBus.execute(query)
    return this.responseBuilder.success(taskStatus, 'TaskStatus retrieved successfully')
  }

  @Delete(':statusId')
  async deleteTaskStatus(
    @Param() { statusId }: TaskStatusIdDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteTaskStatusCommand({ statusId, deletedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'TaskStatus deleted successfully')
  }
}
