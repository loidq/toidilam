import { Module } from '@nestjs/common'

import { TaskAutomationPrismaRepository } from './infrastructure/repositories'

@Module({
  providers: [TaskAutomationPrismaRepository],
  exports: [TaskAutomationPrismaRepository],
})
export class AutomationRepositoryModule {}
