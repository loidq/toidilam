import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import {
  RefreshTokenCommand,
  SignInCommand,
  SignUpCommand,
} from '@/modules/auth/application/commands'
import { RefreshTokenDto, SignInDto, SignUpDto } from '@/modules/auth/application/dtos'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post('sign-up')
  async register(@Body() { name, email, password }: SignUpDto): Promise<any> {
    const command = new SignUpCommand({
      name,
      email,
      password,
    })
    const result = await this.commandBus.execute(command)

    return this.responseBuilder.created(result, 'User registered successfully')
  }

  @Post('sign-in')
  async login(@Body() { email, password }: SignInDto): Promise<any> {
    const command = new SignInCommand({
      email,
      password,
    })
    const result = await this.commandBus.execute(command)

    return this.responseBuilder.success(result, 'Login successful')
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto): Promise<any> {
    const command = new RefreshTokenCommand(refreshToken)
    const result = await this.commandBus.execute(command)
    return this.responseBuilder.success(result, 'Token refreshed successfully')
  }
}
