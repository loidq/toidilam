import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../user/user.module'
import { LoginHandler, RefreshTokenHandler, RegisterHandler } from './application/commands/handlers'
import { JwtService } from './application/services/jwt.service'
import { PasswordService } from './application/services/password.service'
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy'
import { AuthController } from './presentation/controllers/auth.controller'

const COMMAND_HANDLERS = [RegisterHandler, LoginHandler, RefreshTokenHandler]
const JWT_PROVIDERS = [
  {
    provide: 'ACCESS_TOKEN_JWT',
    inject: [ConfigService],
    useFactory: (config: ConfigService): NestJwtService =>
      new NestJwtService({
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRED') },
      }),
  },
  {
    provide: 'REFRESH_TOKEN_JWT',
    inject: [ConfigService],
    useFactory: (config: ConfigService): NestJwtService =>
      new NestJwtService({
        secret: config.get('JWT_REFRESH_SECRET'),
        signOptions: { expiresIn: config.get('JWT_REFRESH_EXPIRED') },
      }),
  },
]

@Module({
  imports: [UserModule, JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [...JWT_PROVIDERS, ...COMMAND_HANDLERS, JwtService, PasswordService, JwtStrategy],
  exports: [PasswordService, JwtService],
})
export class AuthModule {}
