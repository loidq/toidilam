export interface IGridCustomFields {
  [key: string]: any
}

export class GridEntity {
  public readonly id?: string
  public title: string
  public cover?: string
  public projectId: string
  public customFields: IGridCustomFields
  public isDeleted: boolean
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    title: string
    cover?: string
    projectId: string
    customFields?: IGridCustomFields
    isDeleted?: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.title = props.title
    this.cover = props.cover
    this.projectId = props.projectId
    this.customFields = props.customFields || {}
    this.isDeleted = props.isDeleted || false
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    title: string
    projectId: string
    createdBy: string
    cover?: string
    customFields?: IGridCustomFields
  }): GridEntity {
    return new GridEntity(data)
  }

  update(data: {
    title?: string
    cover?: string
    customFields?: IGridCustomFields
    updatedBy?: string
  }): void {
    if (data.title !== undefined) this.title = data.title
    if (data.cover !== undefined) this.cover = data.cover
    if (data.customFields !== undefined)
      this.customFields = { ...this.customFields, ...data.customFields }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }

  delete(): void {
    this.isDeleted = true
  }

  restore(): void {
    this.isDeleted = false
  }
}
