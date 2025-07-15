import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { InviteMemberCommand } from '../invite-member.command'

@CommandHandler(InviteMemberCommand)
export class InviteMemberHandler implements ICommandHandler<InviteMemberCommand> {
  constructor(
    @Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository,
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository, // Assuming you have a user repository to check user existence
  ) {}

  async execute(command: InviteMemberCommand): Promise<OrgMemberEntity> {
    const { organizationId, userId, invitedBy, role } = command

    // Kiểm tra organization có tồn tại không
    const organization = await this.orgRepository.findById(organizationId)
    if (!organization) {
      throw new NotFoundException(`Organization with id "${organizationId}" not found`)
    }
    // Kiểm tra user có tồn tại không
    const existingUser = await this.userRepository.findById(userId)
    if (!existingUser) {
      throw new NotFoundException(`User with id "${userId}" not found`)
    }

    // Kiểm tra user đã là member của org chưa
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
        // Nếu đã từ chối trước đó, cập nhật lại invitation
        const updatedInvitation = existingMember.update({
          status: InvitationStatus.INVITING,
          role,
          updatedBy: invitedBy,
          updatedAt: new Date(),
        })
        return await this.orgMemberRepository.updateOrgMember(updatedInvitation)
      }
    }

    // Tạo invitation mới
    const invitation = OrgMemberEntity.create({
      id: '',
      organizationId,
      userId,
      status: InvitationStatus.INVITING,
      role,
      createdBy: invitedBy,
    })

    return await this.orgMemberRepository.createOrgMember(invitation)
  }
}
