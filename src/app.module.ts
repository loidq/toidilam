import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { OrgModule } from './modules/org/org.module'
import { ProjectModule } from './modules/project/project.module'
import { UserModule } from './modules/user/user.module'
import { CommonModule } from './shared/common/common.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    PrismaModule,
    CommonModule,
    UserModule,
    AuthModule,
    OrgModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
