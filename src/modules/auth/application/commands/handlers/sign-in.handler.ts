/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { JwtService } from '../../services/jwt.service'
import { PasswordService } from '../../services/password.service'
import { SignInCommand } from '../auth.commands'

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: SignInCommand): Promise<any> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await this.passwordService.comparePassword(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = {
      userId: user.id!,
      email,
    }

    const accessToken = this.jwtService.generateAccessToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)

    const { password: _, ...userWithoutPassword } = user

    return {
      ...userWithoutPassword,
      accessToken,
      refreshToken,
    }
  }
}
