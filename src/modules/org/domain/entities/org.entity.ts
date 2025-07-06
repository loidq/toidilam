import { OrgMemberEntity } from './orgMember.entity'

export enum OrgRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MEMBER = 'MEMBER',
}

export class OrgEntity {
  public readonly id: string
  public readonly createdBy: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date

  public readonly name: string
  public readonly slug: string
  public readonly desc?: string
  public readonly cover?: string
  public readonly avatar?: string
  public readonly maxStorageSize?: number
  public readonly updatedBy?: string

  public readonly organizationMembers: OrgMemberEntity[]

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

  // Phương thức cập nhật trả về bản sao mới (immutable)
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
    return new OrgEntity({
      id: this.id,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      name: data.name ?? this.name,
      slug: data.slug ?? this.slug,
      desc: data.desc ?? this.desc,
      cover: data.cover ?? this.cover,
      avatar: data.avatar ?? this.avatar,
      maxStorageSize: data.maxStorageSize ?? this.maxStorageSize,
      updatedBy: data.updatedBy ?? this.updatedBy,
      updatedAt: data.updatedAt ?? this.updatedAt,
      organizationMembers: data.organizationMembers ?? this.organizationMembers,
    })
  }
}
