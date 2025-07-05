import { Global, Module } from '@nestjs/common'

import { ResponseBuilderService } from './services/response-builder.service'
@Global()
@Module({
  providers: [ResponseBuilderService],
  exports: [ResponseBuilderService],
})
export class CommonModule {}
