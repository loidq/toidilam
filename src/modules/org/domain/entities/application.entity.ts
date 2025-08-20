export class ApplicationEntity {
  public readonly id?: string
  public name: string
  public description?: string
  public clientId: string
  public clientSecret: string
  public organizationId: string
  public scopes: string[]
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    name: string
    description?: string
    clientId: string
    clientSecret: string
    organizationId: string
    scopes: string[]
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.clientId = props.clientId
    this.clientSecret = props.clientSecret
    this.organizationId = props.organizationId
    this.scopes = props.scopes
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    name: string
    clientId: string
    clientSecret: string
    organizationId: string
    createdBy: string
    description?: string
    scopes?: string[]
  }): ApplicationEntity {
    return new ApplicationEntity({
      ...data,
      scopes: data.scopes || [],
    })
  }

  update(data: {
    name?: string
    description?: string
    scopes?: string[]
    updatedBy?: string
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.description !== undefined) this.description = data.description
    if (data.scopes !== undefined) this.scopes = data.scopes
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }

  addScope(scope: string): void {
    if (!this.scopes.includes(scope)) {
      this.scopes.push(scope)
    }
  }

  removeScope(scope: string): void {
    this.scopes = this.scopes.filter(s => s !== scope)
  }
}
