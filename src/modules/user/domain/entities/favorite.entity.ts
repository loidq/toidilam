export class FavoriteEntity {
  public readonly id?: string
  public name: string
  public icon: string
  public link: string
  public userId: string
  public organizationId: string
  public type: string
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    name: string
    icon: string
    link: string
    userId: string
    organizationId: string
    type: string
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.name = props.name
    this.icon = props.icon
    this.link = props.link
    this.userId = props.userId
    this.organizationId = props.organizationId
    this.type = props.type
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    name: string
    icon: string
    link: string
    userId: string
    organizationId: string
    type: string
    createdBy: string
  }): FavoriteEntity {
    return new FavoriteEntity(data)
  }

  update(data: {
    name?: string
    icon?: string
    link?: string
    type?: string
    updatedBy?: string
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.icon !== undefined) this.icon = data.icon
    if (data.link !== undefined) this.link = data.link
    if (data.type !== undefined) this.type = data.type
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
