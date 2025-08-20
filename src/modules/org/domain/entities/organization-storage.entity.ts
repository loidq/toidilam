import { OrgStorageType } from '../enums/org-storage-type.enum'

export interface IOrganizationStorageConfig {
  [key: string]: any
}

export class OrganizationStorageEntity {
  public readonly id?: string
  public type: OrgStorageType
  public config: IOrganizationStorageConfig
  public organizationId: string
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    type: OrgStorageType
    config: IOrganizationStorageConfig
    organizationId: string
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.type = props.type
    this.config = props.config
    this.organizationId = props.organizationId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    type: OrgStorageType
    config: IOrganizationStorageConfig
    organizationId: string
    createdBy?: string
  }): OrganizationStorageEntity {
    return new OrganizationStorageEntity(data)
  }

  update(data: {
    type?: OrgStorageType
    config?: IOrganizationStorageConfig
    updatedBy?: string
  }): void {
    if (data.type !== undefined) this.type = data.type
    if (data.config !== undefined) this.config = { ...this.config, ...data.config }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
