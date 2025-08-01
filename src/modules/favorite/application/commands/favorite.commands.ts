export class CreateFavoriteCommand {
  public readonly name: string
  public readonly icon: string
  public readonly link: string
  public readonly userId: string
  public readonly organizationId: string
  public readonly type: string
  public readonly createdBy: string

  constructor(props: {
    name: string
    icon: string
    link: string
    userId: string
    organizationId: string
    type: string
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class DeleteFavoriteCommand {
  public readonly favoriteId: string

  constructor(favoriteId: string) {
    this.favoriteId = favoriteId
  }
}
