import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateOrgCommand,
  RespondOrgInvitationCommand,
  UpdateOrgCommand,
} from '../../application/commands'
import {
  CreateOrgDto,
  GetOrgBySlugDto,
  GetOrgInvitationsQueryDto,
  OrgListQueryDto,
  OrganizationIdDto,
  RespondOrgInvitationDto,
  UpdateOrgDto,
} from '../../application/dtos'
import {
  InvitationResponseDto,
  OrgResponseDto,
  OrgsListResponseDto,
  UserInvitationsResponseDto,
} from '../../application/dtos/org-response.dto'
import {
  GetOrgByIdQuery,
  GetOrgBySlugQuery,
  GetOrgInvitationsQuery,
  GetOrgsQuery,
} from '../../application/queries'
import { OrgMember, OrgRoles } from '../../domain/decorators'
import { OrgMemberEntity } from '../../domain/entities/org-member.entity'
import { OrgRole } from '../../domain/entities/org.entity'
import { OrganizationRoleGuard } from '../../domain/guards'

@ApiTags('Organization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('org') // Changed from 'org' to 'orgs' for plural resource naming
export class OrgController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Organizations retrieved successfully',
    type: OrgsListResponseDto,
  })
  async getOrgList(@Query() { page, limit, search }: OrgListQueryDto): Promise<any> {
    const getOrgsQuery = new GetOrgsQuery({
      page,
      limit,
      search,
    })
    const orgs = await this.queryBus.execute(getOrgsQuery)
    return this.responseBuilder.success(orgs, 'Organizations retrieved successfully')
  }

  @Get(':organizationId')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization retrieved successfully',
    type: OrgResponseDto,
  })
  async getOrgById(@Param() { organizationId }: OrganizationIdDto): Promise<any> {
    const getOrgQuery = new GetOrgByIdQuery(organizationId)
    const org = await this.queryBus.execute(getOrgQuery)
    return this.responseBuilder.success(org, 'Organization retrieved successfully')
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization retrieved successfully',
    type: OrgResponseDto,
  })
  async getOrgBySlug(@Param() { slug }: GetOrgBySlugDto): Promise<any> {
    const getOrgQuery = new GetOrgBySlugQuery(slug)
    const org = await this.queryBus.execute(getOrgQuery)
    return this.responseBuilder.success(org, 'Organization retrieved successfully')
  }

  @Post()
  @ApiOperation({ summary: 'Create new organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created successfully',
    type: OrgResponseDto,
  })
  async createOrg(@Req() req: Request, @Body() createOrgDto: CreateOrgDto): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, slug, desc, cover, avatar, maxStorageSize } = createOrgDto
    const createOrgCommand = new CreateOrgCommand({
      name,
      slug,
      createdBy: userId,
      desc,
      cover,
      avatar,
      maxStorageSize,
    })

    const org = await this.commandBus.execute(createOrgCommand)
    return this.responseBuilder.created(org, 'Organization created successfully')
  }

  @Put(':organizationId')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN) // Only organization admins can update organization settings
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization updated successfully',
    type: OrgResponseDto,
  })
  async updateOrg(
    @Param() { organizationId }: OrganizationIdDto,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() updateOrgDto: UpdateOrgDto,
  ): Promise<any> {
    const { name, slug, desc, cover, avatar, maxStorageSize } = updateOrgDto
    const updateOrgCommand = new UpdateOrgCommand({
      organizationId,
      updatedBy: orgMember.userId,
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
    })

    const org = await this.commandBus.execute(updateOrgCommand)
    return this.responseBuilder.success(org, 'Organization updated successfully')
  }

  @Get('invitation/list')
  @ApiOperation({ summary: 'Get current user invitations' })
  @ApiResponse({
    status: 200,
    description: 'User invitations retrieved successfully',
    type: UserInvitationsResponseDto,
  })
  async getInvitations(
    @Req() req: Request,
    @Query() query: GetOrgInvitationsQueryDto,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { page, limit } = query
    const getUserInvitationsQuery = new GetOrgInvitationsQuery({
      userId,
      page,
      limit,
    })
    const invitations = await this.queryBus.execute(getUserInvitationsQuery)

    return this.responseBuilder.success(invitations, 'User invitations retrieved successfully')
  }

  @Put('invitation/respond')
  @ApiOperation({ summary: 'Respond to organization invitation' })
  @ApiResponse({
    status: 200,
    description: 'Invitation responded successfully',
    type: InvitationResponseDto,
  })
  async respondInvitation(
    @Req() req: Request,
    @Body() respondInvitationDto: RespondOrgInvitationDto,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { status, invitationId } = respondInvitationDto

    const respondInvitationCommand = new RespondOrgInvitationCommand({
      invitationId,
      userId,
      status,
    })
    const invitation = await this.commandBus.execute(respondInvitationCommand)

    return this.responseBuilder.success(
      invitation,
      `Invitation ${status.toLowerCase()} successfully`,
    )
  }
}
