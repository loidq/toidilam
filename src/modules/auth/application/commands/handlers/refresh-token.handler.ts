import { UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { JwtService } from '../../services/jwt.service'
import { RefreshTokenCommand } from '../refresh-token.command'

export interface IRefreshTokenResult {
  accessToken: string
  refreshToken: string
}

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(private readonly jwtService: JwtService) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute(command: RefreshTokenCommand): Promise<IRefreshTokenResult> {
    const { refreshToken } = command

    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken)

      const newAccessToken = this.jwtService.generateAccessToken({
        id: payload.id,
        email: payload.email,
      })

      const newRefreshToken = this.jwtService.generateRefreshToken({
        id: payload.id,
        email: payload.email,
      })

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      }
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
}
