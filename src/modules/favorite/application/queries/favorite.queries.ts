export class GetFavoritesByOrganizationQuery {
  public readonly organizationId: string

  constructor(organizationId: string) {
    this.organizationId = organizationId
  }
}
