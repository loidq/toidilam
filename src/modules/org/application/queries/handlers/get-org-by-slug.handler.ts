import { Inject, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { GetOrgBySlugQuery } from '../org.queries'

@QueryHandler(GetOrgBySlugQuery)
export class GetOrgBySlugQueryHandler implements IQueryHandler<GetOrgBySlugQuery> {
  constructor(
    @Inject('ORG_REPOSITORY')
    private readonly orgRepository: IOrgRepository,
  ) {}

  async execute({ slug }: GetOrgBySlugQuery): Promise<OrgEntity> {
    const org = await this.orgRepository.findBySlug(slug)
    if (!org) {
      throw new NotFoundException('Organization not found')
    }
    return org
  }
}
