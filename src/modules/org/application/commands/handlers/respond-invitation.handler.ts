import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'

import { RespondOrgInvitationCommand } from '../org-member.commands'

@CommandHandler(RespondOrgInvitationCommand)
export class RespondOrgInvitationCommandHandler
  implements ICommandHandler<RespondOrgInvitationCommand>
{
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async execute(command: RespondOrgInvitationCommand): Promise<OrgMemberEntity> {
    const { invitationId, userId, status } = command

    const invitation = await this.orgMemberRepository.findById(invitationId)
    if (!invitation) {
      throw new NotFoundException(`Invitation with id not found`)
    }

    if (invitation.userId !== userId) {
      throw new ForbiddenException(`You are not authorized to respond to this invitation`)
    }

    if (invitation.status !== InvitationStatus.INVITING) {
      throw new ForbiddenException(`This invitation cannot be responded to`)
    }

    const updatedInvitation = invitation.update({
      status,
      updatedBy: userId,
    })

    return await this.orgMemberRepository.update(
      {
        id: invitation.id,
      },
      updatedInvitation,
    )
  }
}
