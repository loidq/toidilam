import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { GetMemberReportDto, GetProjectReportDto } from '../../application/dtos'
import { GetMemberReportQuery, GetProjectReportQuery } from '../../application/queries'

@ApiTags('Report')
@ApiBearerAuth()
@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post('project')
  async getProjectReport(@Body() dto: GetProjectReportDto): Promise<any> {
    const query = new GetProjectReportQuery(
      dto.projectIds,
      new Date(dto.startDate),
      new Date(dto.endDate),
    )

    const result = await this.queryBus.execute(query)

    return this.responseBuilder.success(result, 'Project report retrieved successfully')
  }

  @Post('member')
  async getMemberReport(@Body() dto: GetMemberReportDto): Promise<any> {
    const query = new GetMemberReportQuery(
      new Date(dto.startDate),
      new Date(dto.endDate),
      dto.projectIds,
      dto.memberId,
    )

    const result = await this.queryBus.execute(query)

    return this.responseBuilder.success(result, 'Member report retrieved successfully')
  }
}
