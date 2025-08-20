import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { TaskPointIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateTaskPointCommand,
  DeleteTaskPointCommand,
  UpdateTaskPointCommand,
} from '../../application/commands/task-point.commands'
import {
  CreateTaskPointDto,
  TaskPointListQueryDto,
  UpdateTaskPointDto,
} from '../../application/dtos/task-point.dto'
import {
  GetTaskPointByIdQuery,
  GetTaskPointsQuery,
} from '../../application/queries/task-point.queries'

@ApiTags('TaskPoint')
@ApiBearerAuth()
@Controller('task-point')
@UseGuards(JwtAuthGuard)
export class TaskPointController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createTaskPoint(
    @Body() createTaskPointDto: CreateTaskPointDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { point, projectId, icon } = createTaskPointDto

    const command = new CreateTaskPointCommand({
      point,
      projectId,
      icon,
      createdBy: userId,
    })

    const taskPoint = await this.commandBus.execute(command)
    return this.responseBuilder.created(taskPoint, 'TaskPoint created successfully')
  }

  @Put(':taskPointId')
  async updateTaskPoint(
    @Param() { taskPointId }: TaskPointIdDto,
    @Body() updateTaskPointDto: UpdateTaskPointDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { point, icon } = updateTaskPointDto

    const command = new UpdateTaskPointCommand({
      taskPointId,
      point,
      icon,
      updatedBy: userId,
    })

    const taskPoint = await this.commandBus.execute(command)
    return this.responseBuilder.success(taskPoint, 'TaskPoint updated successfully')
  }

  @Get()
  async getTaskPointList(@Query() queryDto: TaskPointListQueryDto): Promise<any> {
    const { projectId, page, limit } = queryDto

    const query = new GetTaskPointsQuery({
      projectId,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { taskPoints, total } = result as { taskPoints: any[]; total: number }

    return this.responseBuilder.success(taskPoints, 'TaskPoints retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':taskPointId')
  async getTaskPoint(@Param() { taskPointId }: TaskPointIdDto): Promise<any> {
    const query = new GetTaskPointByIdQuery(taskPointId)
    const taskPoint = await this.queryBus.execute(query)
    return this.responseBuilder.success(taskPoint, 'TaskPoint retrieved successfully')
  }

  @Delete(':taskPointId')
  async deleteTaskPoint(
    @Param() { taskPointId }: TaskPointIdDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteTaskPointCommand({ taskPointId, deletedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'TaskPoint deleted successfully')
  }
}
