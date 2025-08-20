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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  AddMemberCommand,
  RemoveMemberCommand,
  UpdateMemberRoleCommand,
} from '../../application/commands'
import {
  MemberDto,
  MemberIdDto,
  MemberListQueryDto,
  ProjectIdDto,
  UpdateMemberRoleDto,
} from '../../application/dtos'
import { GetMembersQuery } from '../../application/queries/member.queries'
@ApiTags('Member')
@ApiBearerAuth()
@Controller('project/:projectId/member')
@UseGuards(JwtAuthGuard)
export class MemberController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get project members' })
  async getMembers(
    @Param() { projectId }: ProjectIdDto,
    @Query() { page, limit }: MemberListQueryDto,
  ): Promise<any> {
    const { members } = await this.queryBus.execute(
      new GetMembersQuery({
        projectId,
        page,
        limit,
      }),
    )
    return this.responseBuilder.success(members, 'Members retrieved successfully')
  }

  @Post()
  @ApiOperation({ summary: 'Add members to project' })
  async addMembers(
    @Param() { projectId }: ProjectIdDto,
    @Body()
    members: MemberDto[],
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    await this.commandBus.execute(
      new AddMemberCommand({
        projectId,
        members,
        createdBy: userId,
      }),
    )
    return this.responseBuilder.success(null, 'Members added successfully')
  }

  @Put()
  @ApiOperation({ summary: 'Update member role' })
  async updateMemberRole(
    @Param() { projectId }: ProjectIdDto,
    @Body() { role, memberId }: UpdateMemberRoleDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    await this.commandBus.execute(
      new UpdateMemberRoleCommand({
        projectId,
        memberId,
        role,
        updatedBy: userId,
      }),
    )
    return this.responseBuilder.success(null, 'Member role updated successfully')
  }

  @Delete(':memberId')
  @ApiParam({ name: 'projectId', type: 'string', required: true })
  @ApiParam({ name: 'memberId', type: 'string', required: true })
  @ApiOperation({ summary: 'Remove member from project' })
  async removeMember(
    @Param() { projectId, memberId }: ProjectIdDto & MemberIdDto,

    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    await this.commandBus.execute(
      new RemoveMemberCommand({
        projectId,
        memberId,
        removedBy: userId,
      }),
    )
    return this.responseBuilder.success(null, 'Member removed successfully')
  }
}
