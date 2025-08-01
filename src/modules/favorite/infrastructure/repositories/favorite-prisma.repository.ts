import { Injectable } from '@nestjs/common'
import { Favorite as PrismaFavorite } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  FavoriteAggregateArgs,
  FavoriteCreateInput,
  FavoriteCreateManyInput,
  FavoriteOmit,
  FavoriteOrderByWithRelationInput,
  FavoriteScalarFieldEnum,
  FavoriteSelect,
  FavoriteUpdateInput,
  FavoriteWhereInput,
  FavoriteWhereUniqueInput,
} from '@/infrastructure/prisma/types/favorite-query-options.types'

import { FavoriteEntity } from '../../domain/entities/favorite.entity'

@Injectable()
export class FavoritePrismaRepository
  extends BasePrismaRepository<
    FavoriteEntity,
    FavoriteWhereInput,
    FavoriteWhereUniqueInput,
    FavoriteCreateInput,
    FavoriteUpdateInput,
    FavoriteSelect,
    never,
    FavoriteOrderByWithRelationInput,
    FavoriteScalarFieldEnum,
    FavoriteAggregateArgs,
    FavoriteOmit,
    FavoriteCreateManyInput
  >
  implements
    IBaseRepository<
      FavoriteEntity,
      FavoriteWhereInput,
      FavoriteWhereUniqueInput,
      FavoriteCreateInput,
      FavoriteUpdateInput,
      FavoriteSelect,
      never,
      FavoriteOrderByWithRelationInput,
      FavoriteScalarFieldEnum,
      FavoriteAggregateArgs,
      FavoriteOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'favorite')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaFavorite: PrismaFavorite): FavoriteEntity {
    return new FavoriteEntity({
      id: prismaFavorite.id,
      name: prismaFavorite.name,
      icon: prismaFavorite.icon,
      link: prismaFavorite.link,
      userId: prismaFavorite.userId,
      organizationId: prismaFavorite.organizationId,
      type: prismaFavorite.type,
      createdAt: prismaFavorite.createdAt,
      updatedAt: prismaFavorite.updatedAt,
      createdBy: prismaFavorite.createdBy,
      updatedBy: prismaFavorite.updatedBy ?? undefined,
    })
  }

  protected toPrismaCreate(entity: FavoriteEntity): FavoriteCreateInput {
    return {
      name: entity.name,
      icon: entity.icon,
      link: entity.link,
      user: {
        connect: { id: entity.userId },
      },
      organization: {
        connect: { id: entity.organizationId },
      },
      type: entity.type,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
    }
  }

  protected toPrismaUpdate(data: Partial<FavoriteEntity>): FavoriteUpdateInput {
    const updateData: FavoriteUpdateInput = {}

    if (data.name !== undefined) updateData.name = data.name
    if (data.icon !== undefined) updateData.icon = data.icon
    if (data.link !== undefined) updateData.link = data.link
    if (data.type !== undefined) updateData.type = data.type
    if (data.updatedBy !== undefined) updateData.updatedBy = data.updatedBy

    return updateData
  }
}
