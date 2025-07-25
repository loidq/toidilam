import { MemberEntity } from './member.entity'
import { ProjectViewEntity } from './project-view.entity'

export class ProjectEntity {
  public readonly id?: string
  public name: string
  public organizationId: string
  public desc?: string
  public cover?: string
  public icon?: string
  public isArchived: boolean
  public isDeleted: boolean = false
  public countMemberTask: boolean
  public countProjectTask: boolean
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
  public createdBy: string
  public updatedBy?: string
  public projectViews: ProjectViewEntity[]
  public members: MemberEntity[]
  constructor(props: {
    id?: string
    name: string
    organizationId: string
    desc?: string
    cover?: string
    icon?: string
    isArchived?: boolean
    isDeleted?: boolean
    countMemberTask?: boolean
    countProjectTask?: boolean
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    createdBy: string
    updatedBy?: string
    projectViews?: ProjectViewEntity[]
    members?: MemberEntity[]
  }) {
    this.id = props.id
    this.name = props.name
    this.organizationId = props.organizationId
    this.desc = props.desc
    this.cover = props.cover
    this.icon = props.icon
    this.isArchived = props.isArchived || false
    this.isDeleted = props.isDeleted || false
    this.countMemberTask = props.countMemberTask || false
    this.countProjectTask = props.countProjectTask || true
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.deletedAt = props.deletedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.projectViews = props.projectViews || []
    this.members = props.members || []
  }

  static create(data: {
    name: string
    organizationId: string
    createdBy: string
    desc?: string
    cover?: string
    icon?: string
  }): ProjectEntity {
    return new ProjectEntity(data)
  }

  update(
    name?: string,
    desc?: string,
    cover?: string,
    icon?: string,
    isArchived?: boolean,
    countMemberTask?: boolean,
    countProjectTask?: boolean,
    updatedBy?: string,
  ): void {
    if (name !== undefined) this.name = name
    if (desc !== undefined) this.desc = desc
    if (cover !== undefined) this.cover = cover
    if (icon !== undefined) this.icon = icon
    if (isArchived !== undefined) this.isArchived = isArchived
    if (countMemberTask !== undefined) this.countMemberTask = countMemberTask
    if (countProjectTask !== undefined) this.countProjectTask = countProjectTask
    if (updatedBy !== undefined) this.updatedBy = updatedBy
  }
}
