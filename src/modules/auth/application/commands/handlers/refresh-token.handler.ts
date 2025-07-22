import { UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { JwtService } from '../../services/jwt.service'
import { RefreshTokenCommand } from '../auth.commands'

export interface IRefreshTokenResult {
  accessToken: string
  refreshToken: string
}

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(private readonly jwtService: JwtService) {}

  async execute({ refreshToken }: RefreshTokenCommand): Promise<IRefreshTokenResult> {
    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken)
      const newPayload = {
        userId: payload.userId,
        email: payload.email,
      }
      const newAccessToken = this.jwtService.generateAccessToken(newPayload)
      const newRefreshToken = this.jwtService.generateRefreshToken(newPayload)
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
