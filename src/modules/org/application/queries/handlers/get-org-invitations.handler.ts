import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgMemberFindQueryOptions } from '@/infrastructure/prisma/types/org-member-query-options.types'
import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'

import { GetOrgInvitationsQuery } from '../org-member.queries'

@QueryHandler(GetOrgInvitationsQuery)
export class GetOrgInvitationsQueryHandler implements IQueryHandler<GetOrgInvitationsQuery> {
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async execute(query: GetOrgInvitationsQuery): Promise<OrgMemberEntity[]> {
    const { userId, page, limit } = query

    const queryOptions: OrgMemberFindQueryOptions = {
      where: {
        userId,
        status: InvitationStatus.INVITING,
      },
      ...(page &&
        limit && {
          skip: (page - 1) * limit,
          take: limit,
        }),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organization: true,
      },
    }

    return await this.orgMemberRepository.findMany(queryOptions)
  }
}
