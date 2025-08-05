import { Module } from '@nestjs/common'

import { VisionPrismaRepository } from './infrastructure/repositories/vision-prisma.repository'

@Module({
  providers: [VisionPrismaRepository],
  exports: [VisionPrismaRepository],
})
export class VisionRepositoryModule {}
