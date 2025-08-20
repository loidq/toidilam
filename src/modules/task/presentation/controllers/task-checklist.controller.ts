import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { TaskChecklistIdDto, TaskIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateTaskChecklistCommand,
  DeleteTaskChecklistCommand,
  UpdateTaskChecklistCommand,
} from '../../application/commands/task-checklist.commands'
import {
  CreateTaskChecklistDto,
  UpdateTaskChecklistDto,
} from '../../application/dtos/task-checklist.dto'
import {
  GetTaskChecklistByIdQuery,
  GetTaskChecklistsByTaskQuery,
} from '../../application/queries/task-components.queries'

@ApiTags('TaskChecklist')
@ApiBearerAuth()
@Controller('task/:taskId/checklist')
@UseGuards(JwtAuthGuard)
export class TaskChecklistController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createTaskChecklist(
    @Param() { taskId }: TaskIdDto,
    @Body() createTaskChecklistDto: CreateTaskChecklistDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { title, order } = createTaskChecklistDto

    const command = new CreateTaskChecklistCommand({
      taskId,
      title,
      order,
      createdBy: userId,
    })

    const taskChecklist = await this.commandBus.execute(command)
    return this.responseBuilder.created(taskChecklist, 'TaskChecklist created successfully')
  }

  @Put(':checklistId')
  async updateTaskChecklist(
    @Param() { checklistId }: TaskChecklistIdDto,
    @Body() updateTaskChecklistDto: UpdateTaskChecklistDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { title, order, done } = updateTaskChecklistDto

    const command = new UpdateTaskChecklistCommand({
      checklistId,
      title,
      order,
      done,
      updatedBy: userId,
    })

    const taskChecklist = await this.commandBus.execute(command)
    return this.responseBuilder.updated(taskChecklist, 'TaskChecklist updated successfully')
  }

  @Get()
  async getTaskChecklists(@Param() { taskId }: TaskIdDto): Promise<any> {
    const query = new GetTaskChecklistsByTaskQuery(taskId)
    const taskChecklists = await this.queryBus.execute(query)
    return this.responseBuilder.success(taskChecklists, 'TaskChecklists retrieved successfully')
  }

  @Get(':checklistId')
  async getTaskChecklist(@Param() { checklistId }: TaskChecklistIdDto): Promise<any> {
    const query = new GetTaskChecklistByIdQuery(checklistId)
    const taskChecklist = await this.queryBus.execute(query)
    return this.responseBuilder.success(taskChecklist, 'TaskChecklist retrieved successfully')
  }

  @Delete(':checklistId')
  async deleteTaskChecklist(
    @Param() { checklistId }: TaskChecklistIdDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteTaskChecklistCommand({ checklistId, deletedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.deleted('TaskChecklist deleted successfully')
  }
}
