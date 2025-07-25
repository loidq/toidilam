import { MemberRole } from '../enums/member.enum'

export class MemberEntity {
  public readonly id?: string
  public readonly projectId: string
  public readonly userId: string
  public role: MemberRole
  public isRemoved: boolean = false
  public removedAt?: Date
  public removedBy?: string
  public readonly createdBy: string
  public readonly createdAt?: Date
  public updatedAt?: Date
  public updatedBy?: string

  public constructor(props: {
    id?: string
    projectId: string
    userId: string
    role: MemberRole
    isRemoved?: boolean
    removedAt?: Date
    removedBy?: string
    createdBy: string
    createdAt?: Date
    updatedAt?: Date
    updatedBy?: string
  }) {
    Object.assign(this, props)
  }

  static create(data: {
    projectId: string
    userId: string
    role?: MemberRole
    createdBy: string
  }): MemberEntity {
    return new MemberEntity({
      projectId: data.projectId,
      userId: data.userId,
      role: data.role ?? MemberRole.MEMBER,
      createdBy: data.createdBy,
    })
  }

  update(data: { role?: MemberRole; updatedBy?: string }): MemberEntity {
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
    if (data.role !== undefined) this.role = data.role
    return this
  }

  remove(removedBy: string): MemberEntity {
    this.isRemoved = true
    this.removedAt = new Date()
    this.updatedBy = removedBy
    return this
  }
}
