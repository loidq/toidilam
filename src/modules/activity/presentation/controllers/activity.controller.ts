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
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  BulkCreateActivitiesCommand,
  CreateActivityCommand,
  DeleteActivityCommand,
  UpdateActivityCommand,
} from '../../application/commands/activity.commands'
import {
  ActivityListQueryDto,
  CreateActivityDto,
  UpdateActivityDto,
} from '../../application/dtos/activity.dto'
import {
  GetActivitiesByTargetQuery,
  GetActivitiesQuery,
  GetActivityByIdQuery,
} from '../../application/queries/activity.queries'

@ApiTags('Activity')
@ApiBearerAuth()
@Controller('activity')
@UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { targetId, targetType, type, data } = createActivityDto

    const command = new CreateActivityCommand({
      targetId,
      targetType,
      type,
      createdBy: userId,
      data,
    })

    const activity = await this.commandBus.execute(command)
    return this.responseBuilder.created(activity, 'Activity created successfully')
  }

  @Post('bulk')
  async createBulkActivities(
    @Body() { activities }: { activities: CreateActivityDto[] },
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload

    const activitiesWithCreatedBy = activities.map(activity => ({
      ...activity,
      createdBy: userId,
    }))

    const command = new BulkCreateActivitiesCommand({
      activities: activitiesWithCreatedBy,
    })

    const createdActivities = await this.commandBus.execute(command)
    return this.responseBuilder.created(createdActivities, 'Activities created successfully')
  }

  @Get()
  async getActivities(@Query() queryDto: ActivityListQueryDto): Promise<any> {
    const { targetId, targetType, type, createdBy, search, includeData, page, limit } = queryDto

    const query = new GetActivitiesQuery({
      targetId,
      targetType,
      type,
      createdBy,
      search,
      includeData,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { activities, total } = result as { activities: any[]; total: number }

    return this.responseBuilder.success(activities, 'Activities retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get('target/:targetType/:targetId')
  async getActivitiesByTarget(
    @Param('targetType') targetType: string,
    @Param('targetId') targetId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<any> {
    const query = new GetActivitiesByTargetQuery({
      targetId,
      targetType: targetType as any,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { activities, total } = result as { activities: any[]; total: number }

    return this.responseBuilder.success(activities, 'Activities retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':activityId')
  async getActivity(@Param('activityId') activityId: string): Promise<any> {
    const query = new GetActivityByIdQuery(activityId)
    const activity = await this.queryBus.execute(query)
    return this.responseBuilder.success(activity, 'Activity retrieved successfully')
  }

  @Put(':activityId')
  async updateActivity(
    @Param('activityId') activityId: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { data } = updateActivityDto

    const command = new UpdateActivityCommand({
      activityId,
      data,
      updatedBy: userId,
    })

    const activity = await this.commandBus.execute(command)
    return this.responseBuilder.success(activity, 'Activity updated successfully')
  }

  @Delete(':activityId')
  async deleteActivity(@Param('activityId') activityId: string, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload

    const command = new DeleteActivityCommand({
      activityId,
      deletedBy: userId,
    })

    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Activity deleted successfully')
  }
}
