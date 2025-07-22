import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { GetMembersQuery } from '../member.queries'

@Injectable()
@QueryHandler(GetMembersQuery)
export class GetMembersQueryHandler implements IQueryHandler<GetMembersQuery> {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: any,
  ) {}

  async execute(query: GetMembersQuery): Promise<any> {
    const { projectId, page, limit } = query

    const members = await this.memberRepository.findByProjectId(projectId, {
      ...(page &&
        limit && {
          skip: (page - 1) * limit,
          take: limit,
        }),
    })

    if (!members) {
      throw new NotFoundException('Members not found for this project')
    }

    return members
  }
}
