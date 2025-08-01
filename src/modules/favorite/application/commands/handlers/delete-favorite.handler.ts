import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { FavoritePrismaRepository } from '../../../infrastructure/repositories/favorite-prisma.repository'
import { DeleteFavoriteCommand } from '../favorite.commands'

@CommandHandler(DeleteFavoriteCommand)
export class DeleteFavoriteCommandHandler implements ICommandHandler<DeleteFavoriteCommand> {
  constructor(private readonly favoriteRepository: FavoritePrismaRepository) {}

  async execute(command: DeleteFavoriteCommand): Promise<void> {
    const { favoriteId } = command

    await this.favoriteRepository.delete({ id: favoriteId })
  }
}
