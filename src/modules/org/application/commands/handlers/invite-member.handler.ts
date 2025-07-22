import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { InviteOrgMemberCommand } from '../org-member.commands'

@CommandHandler(InviteOrgMemberCommand)
export class InviteOrgMemberCommandHandler implements ICommandHandler<InviteOrgMemberCommand> {
  constructor(
    @Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository,
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository, // Assuming you have a user repository to check user existence
  ) {}

  async execute(command: InviteOrgMemberCommand): Promise<OrgMemberEntity> {
    const { organizationId, userId, invitedBy, role } = command

    const organization = await this.orgRepository.findById(organizationId)
    if (!organization) {
      throw new NotFoundException(`Organization with id not found`)
    }

    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new NotFoundException(`User with id not found`)
    }

    const existingMember = await this.orgMemberRepository.findOne({
      where: {
        organizationId,
        userId,
      },
    })

    if (existingMember) {
      if (existingMember.status === InvitationStatus.ACCEPTED) {
        throw new ConflictException(`User is already a member of this organization`)
      }
      if (existingMember.status === InvitationStatus.INVITING) {
        throw new ConflictException(`User has already been invited to this organization`)
      }
      if (existingMember.status === InvitationStatus.REJECTED) {
        const updatedInvitation = existingMember.update({
          status: InvitationStatus.INVITING,
          role,
          updatedBy: invitedBy,
        })
        return await this.orgMemberRepository.update(
          {
            id: existingMember.id,
          },
          updatedInvitation,
        )
      }
    }

    const invitation = OrgMemberEntity.create({
      id: '',
      organizationId,
      userId,
      status: InvitationStatus.INVITING,
      role,
      createdBy: invitedBy,
    })

    return await this.orgMemberRepository.create(invitation)
  }
}
