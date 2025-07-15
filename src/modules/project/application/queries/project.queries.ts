export class GetProjectQuery {
  constructor(public readonly id: string) {}
}

export class GetProjectsByOrganizationQuery {
  constructor(
    public readonly organizationId: string,
    public readonly includeArchived: boolean = false,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

export class GetArchivedProjectsQuery {
  constructor(
    public readonly organizationId: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

export class SearchProjectsQuery {
  constructor(
    public readonly searchTerm: string,
    public readonly organizationId: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

export class GetUserProjectsQuery {
  constructor(
    public readonly userId: string,
    public readonly organizationId: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}
