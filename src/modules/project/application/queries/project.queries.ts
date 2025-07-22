export class GetProjectByIdQuery {
  constructor(public readonly projectId: string) {}
}

export class GetProjectsQuery {
  public readonly organizationId: string
  public readonly isArchived: boolean = false
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    organizationId: string
    isArchived?: boolean
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}

export class SearchProjectsQuery {
  public readonly searchTerm: string
  public readonly organizationId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    searchTerm: string
    organizationId: string
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}

export class GetProjectsByUserQuery {
  public readonly userId: string
  public readonly organizationId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { userId: string; organizationId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}
