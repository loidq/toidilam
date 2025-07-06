import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgMemberFindQueryOptions } from '@/infrastructure/prisma/types/orgMember-query-options.types'
import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'

import { GetUserInvitationsQuery } from '../get-user-invitations.query'

@QueryHandler(GetUserInvitationsQuery)
export class GetUserInvitationsQueryHandler implements IQueryHandler<GetUserInvitationsQuery> {
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async execute(query: GetUserInvitationsQuery): Promise<OrgMemberEntity[]> {
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
