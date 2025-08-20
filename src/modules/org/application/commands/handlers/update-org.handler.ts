import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { UpdateOrgCommand } from '../org.commands'

@CommandHandler(UpdateOrgCommand)
export class UpdateOrgCommandHandler implements ICommandHandler<UpdateOrgCommand> {
  constructor(@Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository) {}

  async execute(command: UpdateOrgCommand): Promise<OrgEntity> {
    const { organizationId, name, slug, desc, cover, avatar, maxStorageSize, updatedBy } = command

    const existingOrg = await this.orgRepository.findById(organizationId)
    if (!existingOrg) {
      throw new NotFoundException(`Organization with id not found`)
    }

    if (slug && slug !== existingOrg.slug) {
      const orgWithSameSlug = await this.orgRepository.findBySlug(slug)
      if (orgWithSameSlug && orgWithSameSlug.id !== organizationId) {
        throw new ConflictException(`Organization with slug "${slug}" already exists`)
      }
    }

    const updatedOrg = existingOrg.update({
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
      updatedBy,
    })

    return await this.orgRepository.update({ id: organizationId }, updatedOrg)
  }
}
