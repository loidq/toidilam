import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth } from '@nestjs/swagger'
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
import { GetOrgQueryDto } from '../../application/dtos/get-org-query.dto'
import { GetUserInvitationsQueryDto } from '../../application/dtos/get-user-invitations-query.dto'
import { InviteMemberByEmailDto } from '../../application/dtos/invite-member-by-email.dto'
import { InviteMemberDto } from '../../application/dtos/invite-member.dto'
import { RespondInvitationDto } from '../../application/dtos/respond-invitation.dto'
import { UpdateOrgDto } from '../../application/dtos/update-org.dto'
import { GetAllOrgsQuery, GetOrgQuery, GetUserInvitationsQuery } from '../../application/queries'

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('org')
export class OrgController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get()
  async getOrg(@Query() query: GetOrgQueryDto): Promise<any> {
    const getOrgQuery = new GetOrgQuery(query.orgId)
    const org = await this.queryBus.execute(getOrgQuery)
    return this.responseBuilder.success(org, 'Organization retrieved successfully')
  }

  @Post()
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

  @Put('')
  async updateOrg(@Req() req: Request, @Body() updateOrgDto: UpdateOrgDto): Promise<any> {
    const { id: updatedBy } = req.user as IJwtPayload
    const { id, name, slug, desc, cover, avatar, maxStorageSize } = updateOrgDto
    const updateOrgCommand = new UpdateOrgCommand(
      id,
      updatedBy,
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

  @Get('all')
  async getAllOrgs(@Query() query: GetAllOrgsQueryDto): Promise<any> {
    const getAllOrgsQuery = new GetAllOrgsQuery(query.page, query.limit, query.search)
    const orgs = await this.queryBus.execute(getAllOrgsQuery)
    return this.responseBuilder.success(orgs, 'Organizations retrieved successfully')
  }

  @Post('invite')
  async inviteMember(@Req() req: Request, @Body() inviteMemberDto: InviteMemberDto): Promise<any> {
    const { id: invitedBy } = req.user as IJwtPayload
    const { organizationId, userId, role } = inviteMemberDto

    const inviteMemberCommand = new InviteMemberCommand(organizationId, userId, invitedBy, role)
    const invitation = await this.commandBus.execute(inviteMemberCommand)

    return this.responseBuilder.success(invitation, 'Member invited successfully')
  }

  @Post('invite/email')
  async inviteMemberByEmail(
    @Req() req: Request,
    @Body() inviteMemberByEmailDto: InviteMemberByEmailDto,
  ): Promise<any> {
    const { id: invitedBy } = req.user as IJwtPayload
    const { organizationId, email, role } = inviteMemberByEmailDto

    const inviteMemberByEmailCommand = new InviteMemberByEmailCommand(
      organizationId,
      email,
      invitedBy,
      role,
    )
    const invitation = await this.commandBus.execute(inviteMemberByEmailCommand)

    return this.responseBuilder.success(invitation, 'Member invited by email successfully')
  }

  @Put('invitation/respond')
  async respondInvitation(
    @Req() req: Request,
    @Body() respondInvitationDto: RespondInvitationDto,
  ): Promise<any> {
    const { id: userId } = req.user as IJwtPayload
    const { invitationId, status } = respondInvitationDto

    const respondInvitationCommand = new RespondInvitationCommand(invitationId, userId, status)
    const invitation = await this.commandBus.execute(respondInvitationCommand)

    return this.responseBuilder.success(
      invitation,
      `Invitation ${status.toLowerCase()} successfully`,
    )
  }

  @Get('invitations')
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
