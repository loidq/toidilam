import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { MemberListQueryDto, ProjectIdDto } from '../../application/dtos'
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
  async getMembers(
    @Param() { projectId }: ProjectIdDto,
    @Query() { page, limit }: MemberListQueryDto,
  ): Promise<any> {
    const members = await this.queryBus.execute(
      new GetMembersQuery({
        projectId,
        page,
        limit,
      }),
    )
    return this.responseBuilder.success(members, 'Members retrieved successfully')
  }
}
