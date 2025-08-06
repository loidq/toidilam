export class GetMemberReportQuery {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly projectIds: string[],
    public readonly memberId: string,
  ) {}
}
