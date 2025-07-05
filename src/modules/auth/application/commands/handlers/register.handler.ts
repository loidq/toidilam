import { ConflictException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserEntity } from '@/modules/user/domain/entities/user.entity'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { PasswordService } from '../../services/password.service'
import { RegisterCommand } from '../register.command'

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: RegisterCommand): Promise<void> {
    const { name, email } = command

    // Check if user already exists
    const existingUser = await this.userRepository.existsByEmail(email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    const hashedPassword = await this.passwordService.hashPassword(command.password)
    // Create new user
    const newUser = UserEntity.createUser('', email, hashedPassword, name)

    await this.userRepository.createUser(newUser)
  }
}
