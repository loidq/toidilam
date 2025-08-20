import { IQuery } from '@nestjs/cqrs'

export class GetOrgMembersQuery implements IQuery {
  public readonly organizationId: string
  public readonly page?: number
  public readonly limit?: number
  public readonly search?: string
  constructor(props: { organizationId: string; page?: number; limit?: number; search?: string }) {
    Object.assign(this, props)
  }
}

export class GetOrgInvitationsQuery implements IQuery {
  public readonly page?: number
  public readonly limit?: number

  public readonly userId: string
  constructor(props: { userId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}
export class SearchOrgMemberQuery implements IQuery {
  public readonly organizationId: string
  public readonly page?: number
  public readonly limit?: number
  public readonly search: string
  constructor(props: { organizationId: string; page?: number; limit?: number; search: string }) {
    Object.assign(this, props)
  }
}
