import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { GetUserByIdQuery } from '../../application/queries'

@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get('')
  async getCurrentUser(@Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const getUserByIdQuery = new GetUserByIdQuery(userId)
    const user = await this.queryBus.execute(getUserByIdQuery)
    return this.responseBuilder.success(user, 'User retrieved successfully')
  }
}
