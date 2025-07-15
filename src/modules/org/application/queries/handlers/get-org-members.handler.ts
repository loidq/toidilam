import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgMemberFindQueryOptions } from '@/infrastructure/prisma/types/orgMember-query-options.types'
import { InvitationStatus, OrgMemberEntity } from '@/modules/org/domain/entities/orgMember.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/orgMember.repository'

import { GetOrgMembersQuery } from '../get-org-members.query'

@QueryHandler(GetOrgMembersQuery)
export class GetOrgMembersQueryHandler implements IQueryHandler<GetOrgMembersQuery> {
  constructor(
    @Inject('ORG_MEMBER_REPOSITORY') private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async execute(query: GetOrgMembersQuery): Promise<OrgMemberEntity[]> {
    const { organizationId, page, limit, search } = query

    const queryOptions: OrgMemberFindQueryOptions = {
      where: {
        organizationId,
        status: InvitationStatus.ACCEPTED,
        ...(search && {
          user: {
            OR: [
              { email: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
            ],
          },
        }),
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
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            photo: true,
          },
        },
      },
    }

    return await this.orgMemberRepository.findMany(queryOptions)
  }
}
