import { ProjectEntity } from '@/modules/project/domain/entities/project.entity'

import { OrgMemberEntity } from './org-member.entity'
import { OrganizationStorageEntity } from './organization-storage.entity'

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

  // Relations
  public organizationMembers: OrgMemberEntity[]
  public projects: ProjectEntity[]
  public organizationStorages: OrganizationStorageEntity[]

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
    projects?: ProjectEntity[]
    organizationStorages?: OrganizationStorageEntity[]
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
    this.organizationMembers = props.organizationMembers || []
    this.projects = props.projects || []
    this.organizationStorages = props.organizationStorages || []
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
