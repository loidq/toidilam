import { OrgEntity } from '../../../org/domain/entities/org.entity'
import { ProjectEntity } from '../../../project/domain/entities/project.entity'

export class VisionEntity {
  public readonly id?: string
  public name: string
  public startDate?: Date
  public dueDate?: Date
  public progress?: number
  public projectId?: string
  public organizationId?: string
  public parentId?: string
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  // Relations
  public parent?: VisionEntity
  public children: VisionEntity[]
  public project?: ProjectEntity
  public organization?: OrgEntity

  constructor(props: {
    id?: string
    name: string
    startDate?: Date
    dueDate?: Date
    progress?: number
    projectId?: string
    organizationId?: string
    parentId?: string
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
    parent?: VisionEntity
    children?: VisionEntity[]
    project?: ProjectEntity
    organization?: OrgEntity
  }) {
    this.id = props.id
    this.name = props.name
    this.startDate = props.startDate
    this.dueDate = props.dueDate
    this.progress = props.progress
    this.projectId = props.projectId
    this.organizationId = props.organizationId
    this.parentId = props.parentId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.parent = props.parent
    this.children = props.children || []
    this.project = props.project
    this.organization = props.organization
  }

  static create(data: {
    name: string
    createdBy: string
    startDate?: Date
    dueDate?: Date
    progress?: number
    projectId?: string
    organizationId?: string
    parentId?: string
  }): VisionEntity {
    return new VisionEntity(data)
  }

  update(data: {
    name?: string
    startDate?: Date
    dueDate?: Date
    progress?: number
    updatedBy?: string
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.startDate !== undefined) this.startDate = data.startDate
    if (data.dueDate !== undefined) this.dueDate = data.dueDate
    if (data.progress !== undefined) this.progress = data.progress
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
