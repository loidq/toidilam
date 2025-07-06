import { ConflictException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { OrgEntity, OrgRole } from '@/modules/org/domain/entities/org.entity'
import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'

import { CreateOrgCommand } from '../create-org.command'
@CommandHandler(CreateOrgCommand)
export class CreateOrgHandler implements ICommandHandler<CreateOrgCommand> {
  constructor(
    @Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository,
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}
  async execute(command: CreateOrgCommand): Promise<OrgEntity> {
    const { name, slug, desc, cover, avatar, maxStorageSize, createdBy } = command

    const orgMember = OrgMemberEntity.create({
      id: '',
      organizationId: '',
      userId: createdBy,
      status: InvitationStatus.ACCEPTED,
      role: OrgRole.ADMIN,
      createdBy,
    })

    const createOrg = OrgEntity.create({
      id: '',
      name,
      slug,
      desc,
      cover,
      avatar,
      maxStorageSize,
      createdBy,
      organizationMembers: [orgMember],
    })
    //check if slug already exists
    const existingSlug = await this.orgRepository.findBySlug(slug)
    if (existingSlug) {
      throw new ConflictException(`Organization with slug "${slug}" already exists`)
    }

    return await this.orgRepository.createOrg(createOrg)
  }
}
