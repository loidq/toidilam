import { Inject, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserStatus } from '@/modules/user/domain/entities/user.entity'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { JwtService } from '../../services/jwt.service'
import { PasswordService } from '../../services/password.service'
import { LoginCommand } from '../login.command'

export interface ILoginResult {
  accessToken: string
  refreshToken: string
  id: string
  email: string
  name: string
  status: UserStatus
  country?: string
  bio?: string
  photo?: string
  dob?: Date
  settings: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
  updatedBy?: string
  deletedAt?: Date
  isDeleted: boolean
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommand): Promise<ILoginResult> {
    const { email } = command

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      command.password,
      user.password,
    )
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = {
      id: user.id,
      email: user.email,
    }
    const accessToken = this.jwtService.generateAccessToken(payload)
    const refreshToken = this.jwtService.generateRefreshToken(payload)
    const { password, ...result } = user
    return {
      ...result,
      accessToken,
      refreshToken,
    }
  }
}
