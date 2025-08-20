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
import { DashboardIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateDashboardCommand,
  DeleteDashboardCommand,
  UpdateDashboardCommand,
} from '../../application/commands'
import {
  CreateDashboardDto,
  DashboardListQueryDto,
  DashboardQueryBurnChartDto,
  DashboardQueryColumnDto,
  DashboardQuerySummaryDto,
  UpdateDashboardDto,
} from '../../application/dtos'
import {
  GetDashboardBurnChartQuery,
  GetDashboardByIdQuery,
  GetDashboardColumnQuery,
  GetDashboardsQuery,
  GetDashboardSummaryQuery,
} from '../../application/queries'

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createDashboard(
    @Body() createDashboardDto: CreateDashboardDto,
    @Req() _req: Request & { user: IJwtPayload },
  ): Promise<any> {
    const command = new CreateDashboardCommand({
      title: createDashboardDto.title,
      projectId: createDashboardDto.projectId,
      isDefault: createDashboardDto.isDefault,
    })

    const dashboard = await this.commandBus.execute(command)

    return this.responseBuilder.created(dashboard, 'Dashboard created successfully')
  }

  @Get()
  async getDashboards(
    @Query() { projectId, isDefault, page, limit }: DashboardListQueryDto,
  ): Promise<any> {
    const getDashboardsQuery = new GetDashboardsQuery({
      projectId,
      isDefault,
      page,
      limit,
    })

    const dashboards = await this.queryBus.execute(getDashboardsQuery)

    return this.responseBuilder.success(dashboards, 'Dashboards retrieved successfully')
  }

  @Get(':dashboardId')
  async getDashboardById(@Param() { dashboardId }: DashboardIdDto): Promise<any> {
    const query = new GetDashboardByIdQuery(dashboardId)
    const dashboard = await this.queryBus.execute(query)

    return this.responseBuilder.success(dashboard, 'Dashboard retrieved successfully')
  }

  @Post('query-summary')
  async getDashboardSummary(
    @Body()
    { projectIds, statusIds, startDate, endDate, priority, assigneeIds }: DashboardQuerySummaryDto,
  ): Promise<any> {
    //TODO: Implement the logic to summarize dashboards based on the provided query parameters
    const query = new GetDashboardSummaryQuery({
      projectIds,
      statusIds,
      startDate,
      endDate,
      priority,
      assigneeIds,
    })

    const summary = await this.queryBus.execute(query)

    return this.responseBuilder.success(summary, 'Dashboard summary retrieved successfully')
  }

  @Post('query-column')
  async getDashboardColumn(
    @Body() { startDate, endDate, projectIds, xAxis, series }: DashboardQueryColumnDto,
  ): Promise<any> {
    const query = new GetDashboardColumnQuery({
      startDate,
      endDate,
      projectIds,
      xAxis,
      series,
    })
    const columnData = await this.queryBus.execute(query)
    return this.responseBuilder.success(columnData, 'Dashboard column data retrieved successfully')
  }

  @Post('query-burnchart/:type')
  async getDashboardBurnChart(
    @Body()
    {
      type,
      startDate,
      endDate,
      projectIds,
      statusIds,
      tagIds,
      assigneeIds,
      icon,
      title,
      points,
      priority,
      dateQuery,
    }: DashboardQueryBurnChartDto,
  ): Promise<any> {
    const query = new GetDashboardBurnChartQuery({
      startDate,
      endDate,
      projectIds,
      statusIds,
      tagIds,
      assigneeIds,
      icon,
      title,
      points,
      priority,
      dateQuery,
    })

    const burnChartData = await this.queryBus.execute(query)

    return this.responseBuilder.success(
      burnChartData,
      'Dashboard burn chart data retrieved successfully',
    )
  }

  @Put(':dashboardId')
  async updateDashboard(
    @Param() { dashboardId }: DashboardIdDto,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ): Promise<any> {
    const command = new UpdateDashboardCommand({
      dashboardId,
      title: updateDashboardDto.title,
      isDefault: updateDashboardDto.isDefault,
    })

    const dashboard = await this.commandBus.execute(command)

    return this.responseBuilder.updated(dashboard, 'Dashboard updated successfully')
  }

  @Delete(':dashboardId')
  async deleteDashboard(@Param() { dashboardId }: DashboardIdDto): Promise<any> {
    const command = new DeleteDashboardCommand(dashboardId)
    await this.commandBus.execute(command)

    return this.responseBuilder.deleted('Dashboard deleted successfully')
  }
}
