import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { FavoriteEntity } from '../../../domain/entities/favorite.entity'
import { FavoritePrismaRepository } from '../../../infrastructure/repositories/favorite-prisma.repository'
import { CreateFavoriteCommand } from '../favorite.commands'

@CommandHandler(CreateFavoriteCommand)
export class CreateFavoriteCommandHandler implements ICommandHandler<CreateFavoriteCommand> {
  constructor(private readonly favoriteRepository: FavoritePrismaRepository) {}

  async execute(command: CreateFavoriteCommand): Promise<FavoriteEntity> {
    const { name, icon, link, userId, organizationId, type, createdBy } = command

    const favorite = new FavoriteEntity({
      name,
      icon,
      link,
      userId,
      organizationId,
      type,
      createdBy,
    })

    return await this.favoriteRepository.create(favorite)
  }
}
