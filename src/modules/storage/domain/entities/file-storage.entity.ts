import { OrgEntity } from '../../../org/domain/entities/org.entity'
import { ProjectEntity } from '../../../project/domain/entities/project.entity'
import { TaskEntity } from '../../../task/domain/entities/task.entity'
import { FileOwnerType } from '../enums/file-owner-type.enum'
import { FileType } from '../enums/file-type.enum'

export class FileStorageEntity {
  public readonly id?: string
  public organizationId?: string
  public projectId?: string
  public taskId?: string
  public name: string
  public keyName: string
  public type: FileType
  public url?: string
  public size?: number
  public mimeType?: string
  public parentId?: string
  public owner?: string
  public ownerType?: FileOwnerType
  public isDeleted: boolean
  public createdAt?: Date
  public deletedAt?: Date
  public deletedBy?: string
  public createdBy: string

  // Relations
  public organization?: OrgEntity
  public project?: ProjectEntity
  public task?: TaskEntity
  public parent?: FileStorageEntity
  public children: FileStorageEntity[]

  constructor(props: {
    id?: string
    organizationId?: string
    projectId?: string
    taskId?: string
    name: string
    keyName: string
    type: FileType
    url?: string
    size?: number
    mimeType?: string
    parentId?: string
    owner?: string
    ownerType?: FileOwnerType
    isDeleted?: boolean
    createdAt?: Date
    deletedAt?: Date
    deletedBy?: string
    createdBy: string
    organization?: OrgEntity
    project?: ProjectEntity
    task?: TaskEntity
    parent?: FileStorageEntity
    children?: FileStorageEntity[]
  }) {
    this.id = props.id
    this.organizationId = props.organizationId
    this.projectId = props.projectId
    this.taskId = props.taskId
    this.name = props.name
    this.keyName = props.keyName
    this.type = props.type
    this.url = props.url
    this.size = props.size
    this.mimeType = props.mimeType
    this.parentId = props.parentId
    this.owner = props.owner
    this.ownerType = props.ownerType
    this.isDeleted = props.isDeleted || false
    this.createdAt = props.createdAt
    this.deletedAt = props.deletedAt
    this.deletedBy = props.deletedBy
    this.createdBy = props.createdBy
    this.organization = props.organization
    this.project = props.project
    this.task = props.task
    this.parent = props.parent
    this.children = props.children || []
  }

  static create(data: {
    name: string
    keyName: string
    type: FileType
    createdBy: string
    organizationId?: string
    projectId?: string
    taskId?: string
    url?: string
    size?: number
    mimeType?: string
    parentId?: string
    owner?: string
    ownerType?: FileOwnerType
  }): FileStorageEntity {
    return new FileStorageEntity(data)
  }

  update(data: {
    name?: string
    keyName?: string
    url?: string
    size?: number
    mimeType?: string
    parentId?: string
    owner?: string
    ownerType?: FileOwnerType
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.keyName !== undefined) this.keyName = data.keyName
    if (data.url !== undefined) this.url = data.url
    if (data.size !== undefined) this.size = data.size
    if (data.mimeType !== undefined) this.mimeType = data.mimeType
    if (data.parentId !== undefined) this.parentId = data.parentId
    if (data.owner !== undefined) this.owner = data.owner
    if (data.ownerType !== undefined) this.ownerType = data.ownerType
  }

  delete(deletedBy: string): void {
    this.isDeleted = true
    this.deletedAt = new Date()
    this.deletedBy = deletedBy
  }

  restore(): void {
    this.isDeleted = false
    this.deletedAt = undefined
    this.deletedBy = undefined
  }
}
