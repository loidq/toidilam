import { Injectable } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UserEntity } from '../../../domain/entities/user.entity'
import { UserPrismaRepository } from '../../../infrastructure/repositories/user-prisma.repository'
import { UpdatePinnedProjectsCommand } from '../update-pinned-projects.command'

@Injectable()
@CommandHandler(UpdatePinnedProjectsCommand)
export class UpdatePinnedProjectsCommandHandler
  implements ICommandHandler<UpdatePinnedProjectsCommand>
{
  constructor(private readonly userRepository: UserPrismaRepository) {}

  async execute({ userId, projectIds }: UpdatePinnedProjectsCommand): Promise<void> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Get current settings or initialize as empty object
    const currentSettings = user.settings || {}

    // Update pinned projects
    const updatedSettings = {
      ...currentSettings,
      pinnedProjects: projectIds,
    }

    // Update the user entity
    const updatedUser = new UserEntity({
      ...user,
      settings: updatedSettings,
    })

    await this.userRepository.update({ id: userId }, updatedUser)
  }
}
