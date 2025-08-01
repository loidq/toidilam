import { Module } from '@nestjs/common'

import {
  CreateFavoriteCommandHandler,
  DeleteFavoriteCommandHandler,
} from './application/commands/handlers'
import { GetFavoritesByOrganizationQueryHandler } from './application/queries/handlers'
import { FavoriteRepositoryModule } from './favorite-repository.module'
import { FavoriteController } from './presentation'

const commandHandlers = [CreateFavoriteCommandHandler, DeleteFavoriteCommandHandler]
const queryHandlers = [GetFavoritesByOrganizationQueryHandler]

@Module({
  imports: [FavoriteRepositoryModule],
  controllers: [FavoriteController],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [],
})
export class FavoriteModule {}
