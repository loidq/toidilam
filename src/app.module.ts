import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { ActivityModule } from './modules/activity'
import { AuthModule } from './modules/auth/auth.module'
import { DashboardModule } from './modules/dashboard'
import { FavoriteModule } from './modules/favorite'
import { OrgModule } from './modules/org/org.module'
import { ProjectModule } from './modules/project/project.module'
import { TaskModule } from './modules/task/task.module'
import { UserModule } from './modules/user/user.module'
import { VisionModule } from './modules/vision/vision.module'
// import { AuthorizationModule } from './shared/authz/authorization.module'
// import { CaslModule } from './shared/casl/casl.module'
import { CommonModule } from './shared/common/common.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    PrismaModule,
    CommonModule,
    // AuthorizationModule,
    // CaslModule, // Use our new CASL module
    UserModule,
    AuthModule,
    OrgModule,
    ProjectModule,
    ActivityModule,
    TaskModule,
    DashboardModule,
    FavoriteModule,
    VisionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
