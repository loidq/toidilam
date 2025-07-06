import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export enum InvitationStatus {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  INVITING = 'INVITING',
}

export class OrgMemberEntity {
  public readonly id: string
  public readonly organizationId: string
  public readonly userId: string
  public readonly createdBy: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date

  public readonly status: InvitationStatus
  public readonly role: OrgRole
  public readonly updatedBy?: string

  public constructor(props: {
    id: string
    organizationId: string
    userId: string
    status: InvitationStatus
    role: OrgRole
    createdBy: string
    updatedBy?: string
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = props.id
    this.organizationId = props.organizationId
    this.userId = props.userId
    this.status = props.status
    this.role = props.role
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  // Factory method tạo mới OrgMemberEntity
  static create(data: {
    id: string
    organizationId: string
    userId: string
    status?: InvitationStatus
    role?: OrgRole
    createdBy: string
    updatedBy?: string
    createdAt?: Date
    updatedAt?: Date
  }): OrgMemberEntity {
    return new OrgMemberEntity({
      id: data.id,
      organizationId: data.organizationId,
      userId: data.userId,
      status: data.status ?? InvitationStatus.INVITING,
      role: data.role ?? OrgRole.MEMBER,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }

  // Phương thức cập nhật trả về bản sao mới (immutable)
  update(data: {
    status?: InvitationStatus
    role?: OrgRole
    updatedBy?: string
    updatedAt?: Date
  }): OrgMemberEntity {
    return new OrgMemberEntity({
      id: this.id,
      organizationId: this.organizationId,
      userId: this.userId,
      status: data.status ?? this.status,
      role: data.role ?? this.role,
      createdBy: this.createdBy,
      updatedBy: data.updatedBy ?? this.updatedBy,
      createdAt: this.createdAt,
      updatedAt: data.updatedAt ?? this.updatedAt,
    })
  }
}
