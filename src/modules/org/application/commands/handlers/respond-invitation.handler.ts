import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'

import { RespondInvitationCommand } from '../respond-invitation.command'

@CommandHandler(RespondInvitationCommand)
export class RespondInvitationHandler implements ICommandHandler<RespondInvitationCommand> {
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async execute(command: RespondInvitationCommand): Promise<OrgMemberEntity> {
    const { invitationId, userId, status } = command

    // Tìm invitation
    const invitation = await this.orgMemberRepository.findById(invitationId)
    if (!invitation) {
      throw new NotFoundException(`Invitation with id "${invitationId}" not found`)
    }

    // Kiểm tra user có quyền respond invitation này không
    if (invitation.userId !== userId) {
      throw new ForbiddenException(`You are not authorized to respond to this invitation`)
    }

    // Kiểm tra invitation có ở trạng thái INVITING không
    if (invitation.status !== InvitationStatus.INVITING) {
      throw new ForbiddenException(`This invitation cannot be responded to`)
    }

    // Cập nhật status
    const updatedInvitation = invitation.update({
      status,
      updatedBy: userId,
      updatedAt: new Date(),
    })

    return await this.orgMemberRepository.updateOrgMember(updatedInvitation)
  }
}
