import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { TaskAutomationIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateTaskAutomationCommand,
  DeleteTaskAutomationCommand,
  UpdateTaskAutomationCommand,
} from '../../application/commands'
import {
  CreateTaskAutomationDto,
  TaskAutomationListQueryDto,
  UpdateTaskAutomationDto,
} from '../../application/dtos'
import { GetTaskAutomationByIdQuery, GetTaskAutomationsQuery } from '../../application/queries'

@ApiTags('TaskAutomation')
@ApiBearerAuth()
@Controller('task-automation')
@UseGuards(JwtAuthGuard)
export class TaskAutomationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createTaskAutomation(
    @Body() createTaskAutomationDto: CreateTaskAutomationDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { organizationId, projectId, when, then } = createTaskAutomationDto

    const command = new CreateTaskAutomationCommand({
      organizationId,
      projectId,
      when,
      then,
      createdBy: userId,
    })

    const taskAutomation = await this.commandBus.execute(command)

    return this.responseBuilder.success(taskAutomation)
  }

  @Get()
  async getTaskAutomations(
    @Query() taskAutomationListQueryDto: TaskAutomationListQueryDto,
  ): Promise<any> {
    const { organizationId, projectId, limit, page } = taskAutomationListQueryDto

    const offset = page && limit ? (page - 1) * limit : undefined

    const query = new GetTaskAutomationsQuery({
      organizationId,
      projectId,
      limit,
      offset,
    })

    const taskAutomations = await this.queryBus.execute(query)

    return this.responseBuilder.success(taskAutomations)
  }

  @Get(':taskAutomationId')
  async getTaskAutomationById(@Param() { taskAutomationId }: TaskAutomationIdDto): Promise<any> {
    const query = new GetTaskAutomationByIdQuery({
      taskAutomationId,
    })

    const taskAutomation = await this.queryBus.execute(query)

    return this.responseBuilder.success(taskAutomation)
  }

  @Patch(':taskAutomationId')
  async updateTaskAutomation(
    @Param() { taskAutomationId }: TaskAutomationIdDto,
    @Body() updateTaskAutomationDto: UpdateTaskAutomationDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { when, then } = updateTaskAutomationDto

    const command = new UpdateTaskAutomationCommand({
      taskAutomationId,
      updatedBy: userId,
      when,
      then,
    })

    const taskAutomation = await this.commandBus.execute(command)

    return this.responseBuilder.success(taskAutomation)
  }

  @Delete(':taskAutomationId')
  async deleteTaskAutomation(
    @Param() { taskAutomationId }: TaskAutomationIdDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload

    const command = new DeleteTaskAutomationCommand({
      taskAutomationId,
    })

    await this.commandBus.execute(command)

    return this.responseBuilder.success({ message: 'TaskAutomation deleted successfully' })
  }
}
