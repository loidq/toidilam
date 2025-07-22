import { ICommand } from '@nestjs/cqrs'

import { InvitationStatus } from '@/modules/org/domain/entities/org-member.entity'
import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export class InviteOrgMemberCommand implements ICommand {
  public readonly organizationId: string
  public readonly userId: string
  public readonly invitedBy: string
  public readonly role?: OrgRole

  constructor(props: {
    organizationId: string
    userId: string
    invitedBy: string
    role?: OrgRole
  }) {
    Object.assign(this, {
      ...props,
      role: props.role ?? OrgRole.MEMBER,
    })
  }
}

export class InviteMemberByEmailCommand implements ICommand {
  public readonly organizationId: string
  public readonly email: string
  public readonly invitedBy: string
  public readonly role: OrgRole
  constructor(props: { organizationId: string; email: string; invitedBy: string; role?: OrgRole }) {
    Object.assign(this, {
      ...props,
      role: props.role ?? OrgRole.MEMBER,
    })
  }
}

export class RespondOrgInvitationCommand implements ICommand {
  public readonly invitationId: string
  public readonly userId: string
  public readonly status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED

  constructor(props: {
    invitationId: string
    userId: string
    status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED
  }) {
    Object.assign(this, props)
  }
}
