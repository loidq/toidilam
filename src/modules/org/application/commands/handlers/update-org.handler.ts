import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { UpdateOrgCommand } from '../update-org.command'

@CommandHandler(UpdateOrgCommand)
export class UpdateOrgHandler implements ICommandHandler<UpdateOrgCommand> {
  constructor(@Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository) {}

  async execute(command: UpdateOrgCommand): Promise<OrgEntity> {
    const { id, name, slug, desc, cover, avatar, maxStorageSize, updatedBy } = command

    // Kiểm tra org có tồn tại không
    const existingOrg = await this.orgRepository.findById(id)
    if (!existingOrg) {
      throw new NotFoundException(`Organization with id "${id}" not found`)
    }

    // Nếu slug được cập nhật, kiểm tra slug mới có bị trùng không (ngoại trừ org hiện tại)
    if (slug && slug !== existingOrg.slug) {
      const orgWithSameSlug = await this.orgRepository.findBySlug(slug)
      if (orgWithSameSlug && orgWithSameSlug.id !== id) {
        throw new ConflictException(`Organization with slug "${slug}" already exists`)
      }
    }

    // Tạo org entity được cập nhật
    const updatedOrg = existingOrg.update({
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
      updatedBy,
    })

    // Lưu vào database
    return await this.orgRepository.updateOrg(updatedOrg)
  }
}
