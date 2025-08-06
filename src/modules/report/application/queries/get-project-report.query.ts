export class GetProjectReportQuery {
  constructor(
    public readonly projectIds: string[],
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
