import { IQuery } from '@nestjs/cqrs'

export class GetOrgByIdQuery implements IQuery {
  constructor(public readonly organizationId: string) {}
}

export class GetOrgBySlugQuery {
  constructor(public readonly slug: string) {}
}

export class GetOrgsQuery implements IQuery {
  public readonly page?: number
  public readonly limit?: number
  public readonly search?: string
  constructor(props: { page?: number; limit?: number; search?: string }) {
    Object.assign(this, props)
  }
}
