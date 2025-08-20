import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { FavoriteEntity } from '../../../domain/entities/favorite.entity'
import { FavoritePrismaRepository } from '../../../infrastructure/repositories/favorite-prisma.repository'
import { GetFavoritesByOrganizationQuery } from '../favorite.queries'

@QueryHandler(GetFavoritesByOrganizationQuery)
export class GetFavoritesByOrganizationQueryHandler
  implements IQueryHandler<GetFavoritesByOrganizationQuery>
{
  constructor(private readonly favoriteRepository: FavoritePrismaRepository) {}

  async execute(query: GetFavoritesByOrganizationQuery): Promise<FavoriteEntity[]> {
    const { organizationId } = query

    return await this.favoriteRepository.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}
