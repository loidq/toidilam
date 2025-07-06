import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { GetOrgQuery } from '../get-org.query'

@QueryHandler(GetOrgQuery)
export class GetOrgQueryHandler implements IQueryHandler<GetOrgQuery> {
  constructor(@Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository) {}

  async execute(command: GetOrgQuery): Promise<OrgEntity | null> {
    const { id } = command
    const org = await this.orgRepository.findById(id)
    console.log('test', org)
    return org
  }
}
