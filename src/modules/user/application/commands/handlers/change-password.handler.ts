import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { PasswordService } from '@/modules/auth/application/services/password.service'

import { UserEntity } from '../../../domain/entities/user.entity'
import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { ChangePasswordCommand } from '../change-password.command'

@Injectable()
@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    private readonly userRepository: UserPrismaRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute({
    userId,
    currentPassword,
    newPassword,
    confirmPassword,
  }: ChangePasswordCommand): Promise<void> {
    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('New password and confirm password do not match')
    }

    // Get user
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isCurrentPasswordValid = await this.passwordService.comparePassword(
      currentPassword,
      user.password,
    )

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect')
    }

    // Hash new password
    const hashedNewPassword = await this.passwordService.hashPassword(newPassword)

    // Update user with new password
    const updatedUser = new UserEntity({
      ...user,
      password: hashedNewPassword,
    })

    await this.userRepository.update({ id: userId }, updatedUser)
  }
}
