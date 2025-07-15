import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  ArchiveProjectCommand,
  CreateProjectCommand,
  DeleteProjectCommand,
  UnarchiveProjectCommand,
  UpdateProjectCommand,
} from '../../application/commands'
import { CreateProjectDto, UpdateProjectDto } from '../../application/dtos'
import {
  GetProjectQuery,
  GetProjectsByOrganizationQuery,
  GetUserProjectsQuery,
  SearchProjectsQuery,
} from '../../application/queries'

@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
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
    @Request() req: any,
  ): Promise<any> {
    const userId = req.user?.id as string
    const command = new CreateProjectCommand(
      createProjectDto.name,
      createProjectDto.organizationId,
      userId,
      createProjectDto.desc,
      createProjectDto.cover,
      createProjectDto.icon,
    )

    const project = await this.commandBus.execute(command)
    return this.responseBuilder.success(project, 'Project created successfully')
  }

  @Get(':id')
  async getProject(@Param('id') id: string): Promise<any> {
    const query = new GetProjectQuery(id)
    const project = await this.queryBus.execute(query)
    return this.responseBuilder.success(project, 'Project retrieved successfully')
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ): Promise<any> {
    const userId = req.user?.id as string
    const command = new UpdateProjectCommand(
      id,
      userId,
      updateProjectDto.name,
      updateProjectDto.desc,
      updateProjectDto.cover,
      updateProjectDto.icon,
      updateProjectDto.isArchived,
      updateProjectDto.countMemberTask,
      updateProjectDto.countProjectTask,
    )

    const project = await this.commandBus.execute(command)
    return this.responseBuilder.success(project, 'Project updated successfully')
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user?.id as string
    const command = new DeleteProjectCommand(id, userId)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project deleted successfully')
  }

  @Post(':id/archive')
  async archiveProject(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user?.id as string
    const command = new ArchiveProjectCommand(id, userId)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project archived successfully')
  }

  @Post(':id/unarchive')
  async unarchiveProject(@Param('id') id: string, @Request() req: any): Promise<any> {
    const userId = req.user?.id as string
    const command = new UnarchiveProjectCommand(id, userId)
    await this.commandBus.execute(command)
    return this.responseBuilder.success(null, 'Project unarchived successfully')
  }

  @Get('organization/:organizationId')
  async getProjectsByOrganization(
    @Param('organizationId') organizationId: string,
    @Query('includeArchived') includeArchived?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<any> {
    const query = new GetProjectsByOrganizationQuery(
      organizationId,
      includeArchived === 'true',
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    )

    const result = await this.queryBus.execute(query)
    const { projects, total } = result as { projects: any[]; total: number }

    return this.responseBuilder.success(projects, 'Projects retrieved successfully', {
      total,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    })
  }

  @Get('search/:organizationId')
  async searchProjects(
    @Param('organizationId') organizationId: string,
    @Query('q') searchTerm: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<any> {
    const query = new SearchProjectsQuery(
      searchTerm,
      organizationId,
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    )

    const result = await this.queryBus.execute(query)
    const { projects, total } = result as { projects: any[]; total: number }
    return this.responseBuilder.success(projects, 'Projects retrieved successfully', {
      total,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    })
  }

  @Get('user/:organizationId')
  async getUserProjects(
    @Param('organizationId') organizationId: string,
    @Request() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<any> {
    const userId = req.user?.id as string
    const query = new GetUserProjectsQuery(
      userId,
      organizationId,
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    )

    const result = await this.queryBus.execute(query)
    const { projects, total } = result as { projects: any[]; total: number }
    return this.responseBuilder.success(projects, 'User projects retrieved successfully', {
      total,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    })
  }
}
