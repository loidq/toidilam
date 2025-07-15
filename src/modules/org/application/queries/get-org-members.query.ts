import { IQuery } from '@nestjs/cqrs'

export class GetOrgMembersQuery implements IQuery {
  constructor(
    public readonly organizationId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
  ) {}
}
