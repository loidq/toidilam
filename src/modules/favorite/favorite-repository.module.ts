import { Module } from '@nestjs/common'

import { FavoritePrismaRepository } from './infrastructure/repositories/favorite-prisma.repository'

@Module({
  providers: [FavoritePrismaRepository],
  exports: [FavoritePrismaRepository],
})
export class FavoriteRepositoryModule {}
