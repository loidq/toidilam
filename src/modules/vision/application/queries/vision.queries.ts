export class GetVisionByIdQuery {
  constructor(public readonly visionId: string) {}
}

export class GetVisionsQuery {
  constructor(
    public readonly projectId?: string,
    public readonly organizationId?: string,
    public readonly month?: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

export class GetVisionsByOrgIdQuery {
  constructor(
    public readonly organizationId: string,
    public readonly month?: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}
