import { ConflictException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserEntity } from '@/modules/user/domain/entities/user.entity'
import { UserStatus } from '@/modules/user/domain/enums/user.enum'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { PasswordService } from '../../services/password.service'
import { SignUpCommand } from '../auth.commands'

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute({ email, name, password }: SignUpCommand): Promise<void> {
    const existingUser = await this.userRepository.existsByEmail(email)
    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    const hashedPassword = await this.passwordService.hashPassword(password)
    const newUser = UserEntity.create({
      email,
      password: hashedPassword,
      name,
      status: UserStatus.ACTIVE,
    })

    await this.userRepository.create(newUser)
  }
}
