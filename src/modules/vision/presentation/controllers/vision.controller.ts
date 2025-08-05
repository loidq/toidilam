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
import { OrganizationIdDto, VisionIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateVisionCommand,
  DeleteVisionCommand,
  UpdateVisionCommand,
} from '../../application/commands/vision.commands'
import {
  CreateVisionDto,
  UpdateVisionDto,
  VisionListQueryDto,
} from '../../application/dtos/vision.dto'
import {
  GetVisionByIdQuery,
  GetVisionsByOrgIdQuery,
  GetVisionsQuery,
} from '../../application/queries/vision.queries'

@ApiTags('Vision')
@ApiBearerAuth()
@Controller('vision')
@UseGuards(JwtAuthGuard)
export class VisionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createVision(@Body() createVisionDto: CreateVisionDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, startDate, dueDate, progress, projectId, organizationId, parentId } =
      createVisionDto

    const command = new CreateVisionCommand({
      name,
      startDate,
      dueDate,
      progress,
      projectId,
      organizationId,
      parentId,
      createdBy: userId,
    })

    const vision = await this.commandBus.execute(command)
    return this.responseBuilder.created(vision, 'Vision created successfully')
  }

  @Put(':visionId')
  async updateVision(
    @Param() { visionId }: VisionIdDto,
    @Body() updateVisionDto: UpdateVisionDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, startDate, dueDate, progress } = updateVisionDto

    const command = new UpdateVisionCommand({
      visionId,
      name,
      startDate,
      dueDate,
      progress,
      updatedBy: userId,
    })

    const vision = await this.commandBus.execute(command)
    return this.responseBuilder.success(vision, 'Vision updated successfully')
  }

  @Get()
  async getVisions(@Query() queryDto: VisionListQueryDto): Promise<any> {
    const { projectId, organizationId, month, page, limit } = queryDto

    const query = new GetVisionsQuery(projectId, organizationId, month, page, limit)

    const result = await this.queryBus.execute(query)
    const { visions, total } = result as { visions: any[]; total: number }

    return this.responseBuilder.success(visions, 'Visions retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get('org/:organizationId')
  async getVisionsByOrgId(
    @Param() { organizationId }: OrganizationIdDto,
    @Query() queryDto: VisionListQueryDto,
  ): Promise<any> {
    const { month, page, limit } = queryDto

    const query = new GetVisionsByOrgIdQuery(organizationId, month, page, limit)

    const result = await this.queryBus.execute(query)
    const { visions, total } = result as { visions: any[]; total: number }

    return this.responseBuilder.success(visions, 'Visions retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':visionId')
  async getVision(@Param() { visionId }: VisionIdDto): Promise<any> {
    const query = new GetVisionByIdQuery(visionId)
    const vision = await this.queryBus.execute(query)
    return this.responseBuilder.success(vision, 'Vision retrieved successfully')
  }

  @Delete(':visionId')
  async deleteVision(@Param() { visionId }: VisionIdDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteVisionCommand({ visionId, deletedBy: userId })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Vision deleted successfully')
  }
}
