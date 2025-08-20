import { ConflictException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { OrgEntity, OrgRole } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { CreateOrgCommand } from '../org.commands'
@CommandHandler(CreateOrgCommand)
export class CreateOrgCommandHandler implements ICommandHandler<CreateOrgCommand> {
  constructor(
    @Inject('ORG_REPOSITORY')
    private readonly orgRepository: IOrgRepository,
  ) {}
  async execute(command: CreateOrgCommand): Promise<OrgEntity> {
    const { name, slug, desc, cover, avatar, maxStorageSize, createdBy } = command

    const createOrgMember = OrgMemberEntity.create({
      organizationId: '',
      userId: createdBy,
      status: InvitationStatus.ACCEPTED,
      role: OrgRole.ADMIN,
      createdBy,
    })

    const createOrg = OrgEntity.create({
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
      createdBy,
      organizationMembers: [createOrgMember],
    })

    const existingSlug = await this.orgRepository.findBySlug(slug)
    if (existingSlug) {
      throw new ConflictException(`Organization with slug already exists`)
    }

    return await this.orgRepository.create(createOrg)
  }
}
