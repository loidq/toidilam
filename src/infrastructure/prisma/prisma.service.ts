import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    //'query', 'info', 'warn',
    super({
      log: ['warn', 'error'],
    })
  }

  async onModuleInit(): Promise<void> {
    await this.$connect()
    console.log('✅ Database connected successfully')
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
    console.log('🔌 Database disconnected')
  }
}
