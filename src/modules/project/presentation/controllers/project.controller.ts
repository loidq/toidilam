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
import { ProjectIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  ArchiveProjectCommand,
  CreateProjectCommand,
  DeleteProjectCommand,
  UpdateProjectCommand,
} from '../../application/commands'
import {
  ArchiveProjectDto,
  CreateProjectDto,
  ProjectListQueryDto,
  UpdateProjectDto,
} from '../../application/dtos'
import { GetProjectByIdQuery, GetProjectsQuery } from '../../application/queries'

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, organizationId, projectViews, members, desc, cover, icon } = createProjectDto
    const command = new CreateProjectCommand({
      name,
      organizationId,
      createdBy: userId,
      projectViews,
      members,
      desc,
      cover,
      icon,
    })

    const project = await this.commandBus.execute(command)
    return this.responseBuilder.created(project, 'Project created successfully')
  }

  @Put(':projectId')
  async updateProject(
    @Param() { projectId }: ProjectIdDto,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, desc, cover, icon, isArchived, countMemberTask, countProjectTask } =
      updateProjectDto
    const command = new UpdateProjectCommand({
      name,
      desc,
      cover,
      icon,
      isArchived,
      countMemberTask,
      countProjectTask,
      projectId: projectId,
      updatedBy: userId,
    })

    const project = await this.commandBus.execute(command)
    return this.responseBuilder.success(project, 'Project updated successfully')
  }
  @Get()
  async getProjectList(
    @Query() { page, limit, isArchived, organizationId }: ProjectListQueryDto,
  ): Promise<any> {
    console.log('Fetching project list with params:', { page, limit, isArchived, organizationId })
    const query = new GetProjectsQuery({
      organizationId,
      isArchived,
      page,
      limit,
    })
    const result = await this.queryBus.execute(query)
    const { projects, total } = result as { projects: any[]; total: number }
    return this.responseBuilder.success(projects, 'Projects retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':projectId')
  async getProject(@Param() { projectId }: ProjectIdDto): Promise<any> {
    const query = new GetProjectByIdQuery(projectId)
    const project = await this.queryBus.execute(query)
    return this.responseBuilder.success(project, 'Project retrieved successfully')
  }

  @Delete(':projectId')
  async deleteProject(@Param() { projectId }: ProjectIdDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new DeleteProjectCommand({
      projectId,
      deletedBy: userId,
    })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project deleted successfully')
  }

  @Patch(':projectId/archive')
  async archiveProject(
    @Param() { projectId }: ProjectIdDto,
    @Body() { isArchived }: ArchiveProjectDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const command = new ArchiveProjectCommand({
      projectId,
      archivedBy: userId,
      isArchived,
    })
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project archived successfully')
  }
}
