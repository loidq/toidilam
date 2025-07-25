import { MemberRole } from '../../domain/enums/member.enum'

export class AddMemberCommand {
  public readonly projectId: string
  public readonly members: Array<{ userId: string; role: MemberRole }>
  public readonly createdBy: string

  constructor(props: {
    projectId: string
    members: Array<{ userId: string; role: MemberRole }>
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateMemberRoleCommand {
  public readonly projectId: string
  public readonly memberId: string
  public readonly role: MemberRole
  public readonly updatedBy: string

  constructor(props: { projectId: string; memberId: string; role: MemberRole; updatedBy: string }) {
    Object.assign(this, props)
  }
}

export class RemoveMemberCommand {
  public readonly projectId: string
  public readonly memberId: string
  public readonly removedBy: string

  constructor(props: { projectId: string; memberId: string; removedBy: string }) {
    Object.assign(this, props)
  }
}
