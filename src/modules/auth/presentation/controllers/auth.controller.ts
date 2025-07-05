import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import {
  LoginCommand,
  RefreshTokenCommand,
  RegisterCommand,
} from '@/modules/auth/application/commands'
import { LoginDto } from '@/modules/auth/application/dtos/login.dto'
import { RegisterDto } from '@/modules/auth/application/dtos/register.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import { RefreshTokenDto } from '../../application/dtos/refresh-token.dto'
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto
    const command = new LoginCommand(email, password)
    const result = await this.commandBus.execute(command)

    return this.responseBuilder.success(result, 'Login successful')
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const { name, email, password } = registerDto
    const command = new RegisterCommand(name, email, password)
    const result = await this.commandBus.execute(command)

    return this.responseBuilder.created(result, 'User registered successfully')
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<any> {
    const command = new RefreshTokenCommand(dto.refreshToken)
    const result = await this.commandBus.execute(command)
    return this.responseBuilder.success(result, 'Token refreshed successfully')
  }
}
