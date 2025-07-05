import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { GetCurrentUserQuery } from '../../application/queries'

@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get('me')
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const { id } = req.user as IJwtPayload
    const getCurrentUserQuery = new GetCurrentUserQuery(id)
    const user = await this.queryBus.execute(getCurrentUserQuery)
    return this.responseBuilder.success(user, 'User retrieved successfully')
  }
}
