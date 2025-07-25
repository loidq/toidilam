import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    //'query', 'info', 'warn',
    super({
      // log: [{ level: 'query', emit: 'event' }],
      log: ['warn', 'error'],
    })
    // ;(this as any).$on('query', (e: Prisma.QueryEvent) => {
    //   console.log('[Prisma QUERY]')
    //   console.log('Query:', e.query)
    //   console.log('Params:', e.params)
    //   console.log('Duration:', e.duration + 'ms')
    // })
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
