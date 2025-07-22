import { OrgMemberEntity } from './org-member.entity'

export enum OrgRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

export class OrgEntity {
  public readonly id: string
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
    id: string
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
    this.id = props.id
    this.name = props.name
    this.slug = props.slug
    this.createdBy = props.createdBy
    this.desc = props.desc
    this.cover = props.cover
    this.avatar = props.avatar
    this.maxStorageSize = props.maxStorageSize
    this.updatedBy = props.updatedBy
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.organizationMembers = props.organizationMembers ?? []
  }

  // Factory method tạo mới OrgEntity
  static create(data: {
    id: string
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
    // return new OrgEntity({
    //   id: this.id,
    //   createdBy: this.createdBy,
    //   createdAt: this.createdAt,
    //   name: data.name ?? this.name,
    //   slug: data.slug ?? this.slug,
    //   desc: data.desc ?? this.desc,
    //   cover: data.cover ?? this.cover,
    //   avatar: data.avatar ?? this.avatar,
    //   maxStorageSize: data.maxStorageSize ?? this.maxStorageSize,
    //   updatedBy: data.updatedBy ?? this.updatedBy,
    //   updatedAt: data.updatedAt ?? this.updatedAt,
    //   organizationMembers: data.organizationMembers ?? this.organizationMembers,
    // })
  }
}
