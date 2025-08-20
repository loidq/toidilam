import { Inject, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { GetOrgByIdQuery } from '../org.queries'

@QueryHandler(GetOrgByIdQuery)
export class GetOrgByIdQueryHandler implements IQueryHandler<GetOrgByIdQuery> {
  constructor(
    @Inject('ORG_REPOSITORY')
    private readonly orgRepository: IOrgRepository,
  ) {}

  async execute({ organizationId }: GetOrgByIdQuery): Promise<OrgEntity> {
    const org = await this.orgRepository.findById(organizationId)
    if (!org) {
      throw new NotFoundException('Organization not found')
    }
    return org
  }
}
