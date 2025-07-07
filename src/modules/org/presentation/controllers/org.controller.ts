import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateOrgCommand,
  InviteMemberByEmailCommand,
  InviteMemberCommand,
  RespondInvitationCommand,
  UpdateOrgCommand,
} from '../../application/commands'
import { CreateOrgDto } from '../../application/dtos/create-org.dto'
import { GetAllOrgsQueryDto } from '../../application/dtos/get-all-orgs-query.dto'
import { GetUserInvitationsQueryDto } from '../../application/dtos/get-user-invitations-query.dto'
import { InviteMemberByEmailDto } from '../../application/dtos/invite-member-by-email.dto'
import { InviteMemberDto } from '../../application/dtos/invite-member.dto'
import {
  InvitationResponseDto,
  OrgResponseDto,
  OrgsListResponseDto,
  UserInvitationsResponseDto,
} from '../../application/dtos/org-response.dto'
import { RespondInvitationDto } from '../../application/dtos/respond-invitation.dto'
import { UpdateOrgDto } from '../../application/dtos/update-org.dto'
import { GetAllOrgsQuery, GetOrgQuery, GetUserInvitationsQuery } from '../../application/queries'
import { OrgMember, OrgRoles } from '../../domain/decorators'
import { OrgRole } from '../../domain/entities/org.entity'
import { OrgMemberEntity } from '../../domain/entities/orgMember.entity'
import { OrganizationRoleGuard } from '../../domain/guards'

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orgs') // Changed from 'org' to 'orgs' for plural resource naming
export class OrgController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  // GET /orgs - List all organizations with pagination and search
  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Organizations retrieved successfully',
    type: OrgsListResponseDto,
  })
  async getAllOrgs(@Query() query: GetAllOrgsQueryDto): Promise<any> {
    const getAllOrgsQuery = new GetAllOrgsQuery(query.page, query.limit, query.search)
    const orgs = await this.queryBus.execute(getAllOrgsQuery)
    return this.responseBuilder.success(orgs, 'Organizations retrieved successfully')
  }

  // POST /orgs - Create new organization
  @Post()
  @ApiOperation({ summary: 'Create new organization' })
  @ApiResponse({
    status: 201,
    description: 'Organization created successfully',
    type: OrgResponseDto,
  })
  async createOrg(@Req() req: Request, @Body() createOrgDto: CreateOrgDto): Promise<any> {
    const { id: createdBy } = req.user as IJwtPayload
    const { name, slug, desc, cover, avatar, maxStorageSize } = createOrgDto
    const createOrgCommand = new CreateOrgCommand(
      name,
      slug,
      createdBy,
      desc,
      cover,
      avatar,
      maxStorageSize,
    )

    const org = await this.commandBus.execute(createOrgCommand)
    return this.responseBuilder.success(org, 'Organization created successfully')
  }

  // GET /orgs/:orgId - Get specific organization by ID
  @Get(':orgId')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'Organization retrieved successfully',
    type: OrgResponseDto,
  })
  async getOrg(@Param('orgId') orgId: string): Promise<any> {
    const getOrgQuery = new GetOrgQuery(orgId)
    const org = await this.queryBus.execute(getOrgQuery)
    return this.responseBuilder.success(org, 'Organization retrieved successfully')
  }

  // PUT /orgs/:orgId - Update specific organization
  @Put(':orgId')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN) // Only organization admins can update organization settings
  @ApiOperation({ summary: 'Update organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization updated successfully',
    type: OrgResponseDto,
  })
  async updateOrg(
    @Param('orgId') orgId: string,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() updateOrgDto: UpdateOrgDto,
  ): Promise<any> {
    const { name, slug, desc, cover, avatar, maxStorageSize } = updateOrgDto
    const updateOrgCommand = new UpdateOrgCommand(
      orgId, // Use param instead of body
      orgMember.userId, // Use orgMember.userId from authorization guard
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
    )

    const org = await this.commandBus.execute(updateOrgCommand)
    return this.responseBuilder.success(org, 'Organization updated successfully')
  }

  // POST /orgs/:orgId/members/invite - Invite member to specific organization
  @Post(':orgId/members/invite')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER) // Admins and managers can invite members
  @ApiOperation({ summary: 'Invite member to organization' })
  @ApiResponse({
    status: 201,
    description: 'Member invited successfully',
    type: InvitationResponseDto,
  })
  async inviteMember(
    @Param('orgId') orgId: string,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() inviteMemberDto: InviteMemberDto,
  ): Promise<any> {
    const { userId, role } = inviteMemberDto

    // Additional business rule: only admins can invite other admins/managers
    if ((role === OrgRole.ADMIN || role === OrgRole.MANAGER) && orgMember.role !== OrgRole.ADMIN) {
      return this.responseBuilder.error(
        'Only administrators can invite users with admin or manager roles',
        '403',
      )
    }

    const inviteMemberCommand = new InviteMemberCommand(orgId, userId, orgMember.userId, role)
    const invitation = await this.commandBus.execute(inviteMemberCommand)

    return this.responseBuilder.success(invitation, 'Member invited successfully')
  }

  // POST /orgs/:orgId/members/invite-by-email - Invite member by email to specific organization
  @Post(':orgId/members/invite-by-email')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER) // Admins and managers can invite members
  @ApiOperation({ summary: 'Invite member to organization by email' })
  @ApiResponse({
    status: 201,
    description: 'Member invited by email successfully',
    type: InvitationResponseDto,
  })
  async inviteMemberByEmail(
    @Param('orgId') orgId: string,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() inviteMemberByEmailDto: InviteMemberByEmailDto,
  ): Promise<any> {
    const { email, role } = inviteMemberByEmailDto

    // Additional business rule: only admins can invite other admins/managers
    if ((role === OrgRole.ADMIN || role === OrgRole.MANAGER) && orgMember.role !== OrgRole.ADMIN) {
      return this.responseBuilder.error(
        'Only administrators can invite users with admin or manager roles',
        '403',
      )
    }

    const inviteMemberByEmailCommand = new InviteMemberByEmailCommand(
      orgId,
      email,
      orgMember.userId,
      role,
    )
    const invitation = await this.commandBus.execute(inviteMemberByEmailCommand)

    return this.responseBuilder.success(invitation, 'Member invited by email successfully')
  }

  // PUT /orgs/invitations/:invitationId/respond - Respond to invitation
  @Put('invitations/:invitationId/respond')
  @ApiOperation({ summary: 'Respond to organization invitation' })
  @ApiResponse({
    status: 200,
    description: 'Invitation responded successfully',
    type: InvitationResponseDto,
  })
  async respondInvitation(
    @Param('invitationId') invitationId: string,
    @Req() req: Request,
    @Body() respondInvitationDto: RespondInvitationDto,
  ): Promise<any> {
    const { id: userId } = req.user as IJwtPayload
    const { status } = respondInvitationDto

    const respondInvitationCommand = new RespondInvitationCommand(invitationId, userId, status)
    const invitation = await this.commandBus.execute(respondInvitationCommand)

    return this.responseBuilder.success(
      invitation,
      `Invitation ${status.toLowerCase()} successfully`,
    )
  }

  // GET /orgs/invitations/me - Get current user's invitations
  @Get('invitations/me')
  @ApiOperation({ summary: 'Get current user invitations' })
  @ApiResponse({
    status: 200,
    description: 'User invitations retrieved successfully',
    type: UserInvitationsResponseDto,
  })
  async getUserInvitations(
    @Req() req: Request,
    @Query() query: GetUserInvitationsQueryDto,
  ): Promise<any> {
    const { id: userId } = req.user as IJwtPayload

    const getUserInvitationsQuery = new GetUserInvitationsQuery(userId, query.page, query.limit)
    const invitations = await this.queryBus.execute(getUserInvitationsQuery)

    return this.responseBuilder.success(invitations, 'User invitations retrieved successfully')
  }
}
