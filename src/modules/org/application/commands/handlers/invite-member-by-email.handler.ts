import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'
import { IUserRepository } from '@/modules/user/domain/repositories/user.repository'

import { InviteMemberByEmailCommand } from '../invite-member-by-email.command'

@CommandHandler(InviteMemberByEmailCommand)
export class InviteMemberByEmailHandler implements ICommandHandler<InviteMemberByEmailCommand> {
  constructor(
    @Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository,
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: InviteMemberByEmailCommand): Promise<OrgMemberEntity> {
    const { organizationId, email, invitedBy, role } = command

    // Kiểm tra organization có tồn tại không
    const organization = await this.orgRepository.findById(organizationId)
    if (!organization) {
      throw new NotFoundException(`Organization with id "${organizationId}" not found`)
    }

    // Tìm user bằng email
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`)
    }

    const userId = user.id

    // Kiểm tra user đã là member của org chưa
    const existingMember = await this.orgMemberRepository.findOne({
      where: {
        organizationId,
        userId,
      },
    })

    if (existingMember) {
      if (existingMember.status === InvitationStatus.ACCEPTED) {
        throw new ConflictException(
          `User with email "${email}" is already a member of this organization`,
        )
      }
      if (existingMember.status === InvitationStatus.INVITING) {
        throw new ConflictException(
          `User with email "${email}" has already been invited to this organization`,
        )
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
