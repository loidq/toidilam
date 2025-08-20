import { ProjectViewType } from '../enums/project-view-type.enum'
export type ProjectViewData = {
  date: string
  priority: string
  point: number
  groupBy: string
  statusIds: string[]
  assigneeIds: string[]
}

export class ProjectViewEntity {
  public readonly id?: string
  public name?: string
  public type: ProjectViewType
  public onlyMe: boolean = false
  public icon?: string
  public projectId: string
  public order?: number
  public data: ProjectViewData
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    name?: string
    type: ProjectViewType
    onlyMe?: boolean
    icon?: string
    projectId: string
    order?: number
    data?: ProjectViewData
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.name = props.name
    this.type = props.type
    this.onlyMe = props.onlyMe || false
    this.icon = props.icon
    this.projectId = props.projectId
    this.order = props.order
    this.data = props.data || ({} as ProjectViewData)
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    name?: string
    type: ProjectViewType
    projectId: string
    createdBy: string
    onlyMe?: boolean
    icon?: string
    order?: number
    data?: ProjectViewData
  }): ProjectViewEntity {
    return new ProjectViewEntity(data)
  }

  update(data: {
    name?: string
    type?: ProjectViewType
    onlyMe?: boolean
    icon?: string
    order?: number
    data?: ProjectViewData
    updatedBy?: string
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.type !== undefined) this.type = data.type
    if (data.onlyMe !== undefined) this.onlyMe = data.onlyMe
    if (data.icon !== undefined) this.icon = data.icon
    if (data.order !== undefined) this.order = data.order
    if (data.data !== undefined) this.data = data.data
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
