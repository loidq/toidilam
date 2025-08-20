import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  AddPinnedProjectCommand,
  ChangePasswordCommand,
  RemovePinnedProjectCommand,
  UpdatePinnedProjectsCommand,
} from '../../application/commands'
import {
  AddPinnedProjectDto,
  ChangePasswordDto,
  RemovePinnedProjectDto,
  UpdatePinnedProjectsDto,
} from '../../application/dtos/user.dtos'
import {
  GetPinnedProjectsQuery,
  GetPinnedProjectsWithDetailsQuery,
  GetUserByIdQuery,
} from '../../application/queries'

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get('')
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const getUserByIdQuery = new GetUserByIdQuery(userId)
    const user = await this.queryBus.execute(getUserByIdQuery)
    return this.responseBuilder.success(user, 'User retrieved successfully')
  }

  @Get('pinned-project')
  async getPinnedProjects(@Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const query = new GetPinnedProjectsQuery(userId)
    const pinnedProjects = await this.queryBus.execute(query)
    return this.responseBuilder.success(pinnedProjects, 'Pinned projects retrieved successfully')
  }

  @Get('pinned-project/details')
  async getPinnedProjectsWithDetails(@Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const query = new GetPinnedProjectsWithDetailsQuery(userId)
    const pinnedProjects = await this.queryBus.execute(query)
    return this.responseBuilder.success(
      pinnedProjects,
      'Pinned projects with details retrieved successfully',
    )
  }

  @Put('pinned-project')
  async updatePinnedProjects(
    @Body() dto: UpdatePinnedProjectsDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new UpdatePinnedProjectsCommand(userId, dto.projectIds)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Pinned projects updated successfully')
  }

  @Post('pinned-project')
  async addPinnedProject(@Body() dto: AddPinnedProjectDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new AddPinnedProjectCommand(userId, dto.projectId)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project pinned successfully')
  }

  @Delete('pinned-project')
  async removePinnedProject(
    @Body() dto: RemovePinnedProjectDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new RemovePinnedProjectCommand(userId, dto.projectId)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project unpinned successfully')
  }

  @Post('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new ChangePasswordCommand({
      userId,
      currentPassword: dto.currentPassword,
      newPassword: dto.newPassword,
      confirmPassword: dto.confirmPassword,
    })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Password changed successfully')
  }
}
