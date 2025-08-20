import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { InviteMemberByEmailCommand, InviteOrgMemberCommand } from '../../application/commands'
import {
  GetOrgMembersQueryDto,
  InviteOrgMemberByEmailDto,
  InviteOrgMemberByIdDto,
  OrganizationIdDto,
} from '../../application/dtos'
import { InvitationResponseDto } from '../../application/dtos/org-response.dto'
import { GetOrgMembersQuery } from '../../application/queries'
import { OrgMember, OrgRoles } from '../../domain/decorators'
import { OrgMemberEntity } from '../../domain/entities/org-member.entity'
import { OrgRole } from '../../domain/entities/org.entity'
import { OrganizationRoleGuard } from '../../domain/guards'

@ApiTags('Organization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('org/:organizationId/member')
export class OrgMemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get('')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER, OrgRole.MEMBER)
  @ApiOperation({ summary: 'Get all members of organization' })
  @ApiResponse({
    status: 200,
    description: 'Organization members retrieved successfully',
    type: [OrgMemberEntity],
  })
  async getOrgMembers(
    @Param() { organizationId }: OrganizationIdDto,
    @Query() query: GetOrgMembersQueryDto,
  ): Promise<any> {
    const { page, limit, search } = query
    const getOrgMembersQuery = new GetOrgMembersQuery({
      organizationId,
      page,
      limit,
      search,
    })
    const orgMembers = await this.queryBus.execute(getOrgMembersQuery)
    return this.responseBuilder.success(orgMembers, 'Organization members retrieved successfully')
  }

  @Post('invite')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER)
  @ApiOperation({ summary: 'Invite member to organization' })
  @ApiResponse({
    status: 201,
    description: 'Member invited successfully',
    type: InvitationResponseDto,
  })
  async inviteOrgMember(
    @Param() { organizationId }: OrganizationIdDto,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() inviteMemberDto: InviteOrgMemberByIdDto,
  ): Promise<any> {
    const { userId, role } = inviteMemberDto

    if ((role === OrgRole.ADMIN || role === OrgRole.MANAGER) && orgMember.role !== OrgRole.ADMIN) {
      return this.responseBuilder.error(
        'Only administrators can invite users with admin or manager roles',
        '403',
      )
    }

    const inviteMemberCommand = new InviteOrgMemberCommand({
      organizationId,
      userId,
      invitedBy: orgMember.userId,
      role,
    })

    const invitation = await this.commandBus.execute(inviteMemberCommand)

    return this.responseBuilder.created(invitation, 'Member invited successfully')
  }

  @Post('invite-by-email')
  @UseGuards(OrganizationRoleGuard)
  @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER)
  @ApiOperation({ summary: 'Invite member to organization' })
  @ApiResponse({
    status: 201,
    description: 'Member invited successfully',
    type: InvitationResponseDto,
  })
  async inviteOrgMemberByEmail(
    @Param() { organizationId }: OrganizationIdDto,
    @OrgMember() orgMember: OrgMemberEntity,
    @Body() inviteMemberDto: InviteOrgMemberByEmailDto,
  ): Promise<any> {
    const { email, role } = inviteMemberDto

    if ((role === OrgRole.ADMIN || role === OrgRole.MANAGER) && orgMember.role !== OrgRole.ADMIN) {
      return this.responseBuilder.error(
        'Only administrators can invite users with admin or manager roles',
        '403',
      )
    }

    const inviteMemberCommand = new InviteMemberByEmailCommand({
      organizationId,
      email,
      invitedBy: orgMember.userId,
      role,
    })

    const invitation = await this.commandBus.execute(inviteMemberCommand)

    return this.responseBuilder.created(invitation, 'Member invited successfully')
  }
}
