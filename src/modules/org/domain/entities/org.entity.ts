import { OrgMemberEntity } from './org-member.entity'

export enum OrgRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

export class OrgEntity {
  public readonly id?: string
  public createdBy: string
  public createdAt?: Date
  public updatedAt?: Date

  public name: string
  public slug: string
  public desc?: string
  public cover?: string
  public avatar?: string
  public maxStorageSize?: number
  public updatedBy?: string

  public organizationMembers: OrgMemberEntity[]

  public constructor(props: {
    id?: string
    name: string
    slug: string
    createdBy: string
    desc?: string
    cover?: string
    avatar?: string
    maxStorageSize?: number
    updatedBy?: string
    createdAt?: Date
    updatedAt?: Date
    organizationMembers?: OrgMemberEntity[]
  }) {
    Object.assign(this, props)
  }

  static create(data: {
    name: string
    slug: string
    createdBy: string
    desc?: string
    cover?: string
    avatar?: string
    maxStorageSize?: number
    updatedBy?: string
    createdAt?: Date
    updatedAt?: Date
    organizationMembers?: OrgMemberEntity[]
  }): OrgEntity {
    return new OrgEntity(data)
  }

  update(data: {
    name?: string
    slug?: string
    desc?: string
    cover?: string
    avatar?: string
    maxStorageSize?: number
    updatedBy?: string
    updatedAt?: Date
    organizationMembers?: OrgMemberEntity[]
  }): OrgEntity {
    if (data.name !== undefined) this.name = data.name
    if (data.slug !== undefined) this.slug = data.slug
    if (data.desc !== undefined) this.desc = data.desc
    if (data.cover !== undefined) this.cover = data.cover
    if (data.avatar !== undefined) this.avatar = data.avatar
    if (data.maxStorageSize !== undefined) this.maxStorageSize = data.maxStorageSize
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
    return this
  }
}
