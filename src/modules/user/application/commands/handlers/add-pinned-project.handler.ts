import { Injectable } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserEntity } from '../../../domain/entities/user.entity'
import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { AddPinnedProjectCommand } from '../add-pinned-project.command'

@Injectable()
@CommandHandler(AddPinnedProjectCommand)
export class AddPinnedProjectCommandHandler implements ICommandHandler<AddPinnedProjectCommand> {
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({ userId, projectId }: AddPinnedProjectCommand): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Get current settings or initialize as empty object
    const currentSettings = user.settings || {}
    const currentPinnedProjects = currentSettings.pinnedProjects || []

    // Add project if not already pinned
    if (!currentPinnedProjects.includes(projectId)) {
      const updatedSettings = {
        ...currentSettings,
        pinnedProjects: [...currentPinnedProjects, projectId],
      }

      // Update the user entity
      const updatedUser = new UserEntity({
        ...user,
        settings: updatedSettings,
      })

      await this.userRepository.update({ id: userId }, updatedUser)
    }
  }
}
