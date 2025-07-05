import { Inject, Injectable } from '@nestjs/common'
import { JwtService as NestJwtService } from '@nestjs/jwt'

export interface IJwtPayload {
  id: string
  email: string
}

@Injectable()
export class JwtService {
  constructor(
    @Inject('ACCESS_TOKEN_JWT') private readonly accessTokenJwt: NestJwtService,
    @Inject('REFRESH_TOKEN_JWT') private readonly refreshTokenJwt: NestJwtService,
  ) {}
  generateAccessToken(payload: IJwtPayload): string {
    return this.accessTokenJwt.sign(payload)
  }

  generateRefreshToken(payload: IJwtPayload): string {
    return this.refreshTokenJwt.sign(payload)
  }

  verifyAccessToken(token: string): IJwtPayload {
    return this.accessTokenJwt.verify(token)
  }

  verifyRefreshToken(token: string): IJwtPayload {
    return this.refreshTokenJwt.verify(token)
  }
  decodeAccessToken(token: string): IJwtPayload {
    return this.accessTokenJwt.decode(token)
  }
}
