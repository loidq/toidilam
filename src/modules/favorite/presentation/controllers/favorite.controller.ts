import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { FavoriteIdDto, OrganizationIdDto } from '@/shared/common/dtos'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { CreateFavoriteCommand, DeleteFavoriteCommand } from '../../application/commands'
import { CreateFavoriteDto } from '../../application/dtos/favorite.dto'
import { GetFavoritesByOrganizationQuery } from '../../application/queries'
@ApiTags('Favorite')
@ApiBearerAuth()
@Controller('favorite')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Get()
  async getFavoritesByOrganization(@Query() { organizationId }: OrganizationIdDto): Promise<any> {
    const query = new GetFavoritesByOrganizationQuery(organizationId)
    const favorites = await this.queryBus.execute(query)

    return this.responseBuilder.success(favorites, 'Favorites retrieved successfully')
  }

  @Post()
  async createFavorite(
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { name, icon, link, userId: targetUserId, organizationId, type } = createFavoriteDto

    const command = new CreateFavoriteCommand({
      name,
      icon,
      link,
      userId: targetUserId,
      organizationId,
      type,
      createdBy: userId,
    })

    const favorite = await this.commandBus.execute(command)

    return this.responseBuilder.created(favorite, 'Favorite created successfully')
  }

  @Delete(':favoriteId')
  async deleteFavorite(@Param() { favoriteId }: FavoriteIdDto): Promise<any> {
    const command = new DeleteFavoriteCommand(favoriteId)
    await this.commandBus.execute(command)

    return this.responseBuilder.deleted('Favorite deleted successfully')
  }
}
