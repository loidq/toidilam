import { OrgRole } from './org.entity'

export enum InvitationStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  INVITING = 'INVITING',
}

export class OrgMemberEntity {
  public readonly id?: string
  public readonly organizationId: string
  public readonly userId: string
  public readonly createdBy: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
  public readonly removedAt?: Date
  public readonly isRemoved: boolean = false
  public readonly removedBy?: string
  public readonly status: InvitationStatus
  public readonly role: OrgRole
  public readonly updatedBy?: string

  public constructor(props: {
    id?: string
    organizationId: string
    userId: string
    status: InvitationStatus
    role: OrgRole
    createdBy: string
    updatedBy?: string
    createdAt?: Date
    updatedAt?: Date
    removedAt?: Date
    isRemoved?: boolean
    removedBy?: string
  }) {
    Object.assign(this, props)
  }

  static create(data: {
    organizationId: string
    userId: string
    status?: InvitationStatus
    role?: OrgRole
    createdBy: string
    updatedBy?: string
  }): OrgMemberEntity {
    return new OrgMemberEntity({
      organizationId: data.organizationId,
      userId: data.userId,
      status: data.status ?? InvitationStatus.INVITING,
      role: data.role ?? OrgRole.MEMBER,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    })
  }

  update(data: { status?: InvitationStatus; role?: OrgRole; updatedBy?: string }): OrgMemberEntity {
    return new OrgMemberEntity({
      id: this.id,
      organizationId: this.organizationId,
      userId: this.userId,
      status: data.status ?? this.status,
      role: data.role ?? this.role,
      createdBy: this.createdBy,
      updatedBy: data.updatedBy ?? this.updatedBy,
    })
  }
}
