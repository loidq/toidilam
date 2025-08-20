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
import { DashboardComponentIdDto } from '@/shared/common/dtos'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateDashboardComponentCommand,
  DeleteDashboardComponentCommand,
  UpdateDashboardComponentCommand,
} from '../../application/commands'
import {
  CreateDashboardComponentDto,
  DashboardComponentListQueryDto,
  UpdateDashboardComponentDto,
} from '../../application/dtos'
import {
  GetDashboardComponentByIdQuery,
  GetDashboardComponentsQuery,
} from '../../application/queries'
import { DashboardComponentType } from '../../domain/enums/dashboard-component-type.enum'

@ApiTags('Dashboard Components')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard-component')
export class DashboardComponentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createDashboardComponent(
    @Body() createDto: CreateDashboardComponentDto,
    @Req() req: Request & { user: IJwtPayload },
  ): Promise<any> {
    const command = new CreateDashboardComponentCommand({
      dashboardId: createDto.dashboardId,
      title: createDto.title,
      type: createDto.type as DashboardComponentType,
      config: createDto.config,
      x: createDto.x,
      y: createDto.y,
      width: createDto.width,
      height: createDto.height,
      createdBy: req.user.userId,
    })

    const component = await this.commandBus.execute(command)

    return this.responseBuilder.success(component, 'Dashboard component retrieved successfully')
  }

  @Get()
  async getDashboardComponents(
    @Query() { dashboardId, type, page, limit }: DashboardComponentListQueryDto,
  ): Promise<any> {
    const query = new GetDashboardComponentsQuery({
      dashboardId,
      type,
      page,
      limit,
    })

    const components = await this.queryBus.execute(query)

    return this.responseBuilder.success(components, 'Dashboard components retrieved successfully')
  }

  @Get(':dashboardComponentId')
  async getDashboardComponentById(
    @Param() { dashboardComponentId }: DashboardComponentIdDto,
  ): Promise<any> {
    const query = new GetDashboardComponentByIdQuery(dashboardComponentId)
    const component = await this.queryBus.execute(query)

    return this.responseBuilder.success(component, 'Dashboard component retrieved successfully')
  }

  @Put(':dashboardComponentId')
  async updateDashboardComponent(
    @Param() { dashboardComponentId }: DashboardComponentIdDto,
    @Body() updateDto: UpdateDashboardComponentDto,
    @Req() req: Request & { user: IJwtPayload },
  ): Promise<any> {
    const command = new UpdateDashboardComponentCommand({
      dashboardComponentId,
      title: updateDto.title,
      type: updateDto.type as string,
      config: updateDto.config,
      x: updateDto.x,
      y: updateDto.y,
      width: updateDto.width,
      height: updateDto.height,
      updatedBy: req.user.userId,
    })

    const component = await this.commandBus.execute(command)

    return this.responseBuilder.updated(component, 'Dashboard component retrieved successfully')
  }

  @Delete(':dashboardComponentId')
  async deleteDashboardComponent(
    @Param() { dashboardComponentId }: DashboardComponentIdDto,
  ): Promise<any> {
    const command = new DeleteDashboardComponentCommand(dashboardComponentId)
    await this.commandBus.execute(command)

    return this.responseBuilder.deleted('Dashboard component deleted successfully')
  }
}
