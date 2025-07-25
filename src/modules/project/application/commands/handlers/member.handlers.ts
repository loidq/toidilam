import { ConflictException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { InvitationStatus } from '@/modules/org/domain/entities/org-member.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'
import { IProjectRepository } from '@/modules/project/domain/repositories/project.repository'

import { MemberEntity } from '../../../domain/entities/member.entity'
import { IMemberRepository } from '../../../domain/repositories/member.repository'
import { AddMemberCommand, RemoveMemberCommand, UpdateMemberRoleCommand } from '../member.commands'
@CommandHandler(AddMemberCommand)
export class AddMemberCommandHandler implements ICommandHandler<AddMemberCommand> {
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY')
    private readonly orgMemberRepository: IOrgMemberRepository,
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,

    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(command: AddMemberCommand): Promise<void> {
    const { projectId, members, createdBy } = command

    const project = await this.projectRepository.findById(projectId)

    if (!project || project.isDeleted || project.isArchived)
      throw new NotFoundException('Project not found')

    // Verify all users exist
    const userIds = members.map(member => member.userId)
    const users = await this.orgMemberRepository.findMany({
      where: {
        userId: { in: userIds },
        status: InvitationStatus.ACCEPTED,
        organizationId: project.organizationId,
      },
      select: {
        id: true,
        role: true,
      },
    })

    if (users.length !== userIds.length) {
      const foundUserIds = users.map(user => user.id)
      const notFoundUserIds = userIds.filter(id => !foundUserIds.includes(id))
      throw new ConflictException(`Users not found: ${notFoundUserIds.join(', ')}`)
    }

    for (const member of members) {
      const exists = await this.memberRepository.findOne({
        where: {
          projectId,
          userId: member.userId,
        },
        select: {
          id: true,
        },
      })
      if (exists)
        throw new ConflictException(`User ${member.userId} is already a member of this project`)
    }

    const memberEntities = members.map(member =>
      MemberEntity.create({
        projectId,
        userId: member.userId,
        role: member.role,
        createdBy,
      }),
    )

    await this.memberRepository.createMany(memberEntities)
  }
}

@CommandHandler(UpdateMemberRoleCommand)
export class UpdateMemberRoleCommandHandler implements ICommandHandler<UpdateMemberRoleCommand> {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(command: UpdateMemberRoleCommand): Promise<void> {
    const { projectId, memberId, role, updatedBy } = command

    const member = await this.memberRepository.findById(memberId)
    if (!member || member.projectId !== projectId || member.isRemoved) {
      throw new NotFoundException('Member not found in this project')
    }

    // Update member role
    const updatedMember = member.update({
      role,
      updatedBy,
    })

    await this.memberRepository.update({ id: memberId }, updatedMember)
  }
}

@CommandHandler(RemoveMemberCommand)
export class RemoveMemberCommandHandler implements ICommandHandler<RemoveMemberCommand> {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(command: RemoveMemberCommand): Promise<void> {
    const { projectId, memberId, removedBy } = command

    const member = await this.memberRepository.findById(memberId)
    if (!member || member.projectId !== projectId || member.isRemoved)
      throw new NotFoundException('Member not found in this project')

    await this.memberRepository.removeMember({ id: memberId }, removedBy)
  }
}
