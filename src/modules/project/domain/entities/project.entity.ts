export class ProjectEntity {
  public readonly id: string
  public name: string
  public organizationId: string
  public desc?: string
  public cover?: string
  public icon?: string
  public isArchived: boolean
  public countMemberTask: boolean
  public countProjectTask: boolean
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: string
  public updatedBy?: string
  constructor(props: {
    id: string
    name: string
    organizationId: string
    desc?: string
    cover?: string
    icon?: string
    isArchived?: boolean
    countMemberTask?: boolean
    countProjectTask?: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.name = props.name
    this.organizationId = props.organizationId
    this.desc = props.desc
    this.cover = props.cover
    this.icon = props.icon
    this.isArchived = props.isArchived || false
    this.countMemberTask = props.countMemberTask || false
    this.countProjectTask = props.countProjectTask || true
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static createProject(data: {
    id: string
    name: string
    organizationId: string
    createdBy: string
    desc?: string
    cover?: string
    icon?: string
  }): ProjectEntity {
    return new ProjectEntity(data)
  }

  updateProject(
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
    this.updatedAt = new Date()
  }
}
