import { Injectable } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserEntity } from '../../../domain/entities/user.entity'
import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { RemovePinnedProjectCommand } from '../remove-pinned-project.command'

@Injectable()
@CommandHandler(RemovePinnedProjectCommand)
export class RemovePinnedProjectCommandHandler
  implements ICommandHandler<RemovePinnedProjectCommand>
{
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({ userId, projectId }: RemovePinnedProjectCommand): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Get current settings or initialize as empty object
    const currentSettings = user.settings || {}
    const currentPinnedProjects = currentSettings.pinnedProjects || []

    // Remove project if pinned
    const updatedPinnedProjects = currentPinnedProjects.filter((id: string) => id !== projectId)

    const updatedSettings = {
      ...currentSettings,
      pinnedProjects: updatedPinnedProjects,
    }

    // Update the user entity
    const updatedUser = new UserEntity({
      ...user,
      settings: updatedSettings,
    })

    await this.userRepository.update({ id: userId }, updatedUser)
  }
}
