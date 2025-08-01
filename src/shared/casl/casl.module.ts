import { Global, Module } from '@nestjs/common'

import { CaslAbilityFactory } from './casl-ability.factory'
import { CaslService } from './casl.service'
import { PolicyService } from './policy.service'

@Global()
@Module({
  providers: [CaslAbilityFactory, CaslService, PolicyService],
  exports: [CaslAbilityFactory, CaslService, PolicyService],
})
export class CaslModule {}
