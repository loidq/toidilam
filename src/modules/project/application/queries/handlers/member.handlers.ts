import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project/domain/repositories/project.repository'

import { IMemberRepository } from '../../../domain/repositories/member.repository'
import { GetMemberQuery, GetMembersQuery } from '../member.queries'

@Injectable()
@QueryHandler(GetMembersQuery)
export class GetMembersQueryHandler implements IQueryHandler<GetMembersQuery> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,

    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({ projectId, page, limit }: GetMembersQuery): Promise<any> {
    const project = await this.projectRepository.findById(projectId)

    if (!project || project.isDeleted || project.isArchived)
      throw new NotFoundException('Project not found')

    const _members = this.memberRepository.findMany({
      where: {
        projectId,
        isRemoved: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
      orderBy: {
        role: 'asc',
      },
      ...(page &&
        limit && {
          skip: (page - 1) * limit,
          take: limit,
        }),
    })

    const _total = this.memberRepository.count({
      where: {
        projectId,
        isRemoved: false,
      },
    })

    const [members, total] = await Promise.all([_members, _total])

    return {
      members,
      total,
      page: page || 1,
      limit: limit || total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    }
  }
}

@Injectable()
@QueryHandler(GetMemberQuery)
export class GetMemberQueryHandler implements IQueryHandler<GetMemberQuery> {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute({ projectId, userId }: GetMemberQuery): Promise<any> {
    const member = await this.memberRepository.findOne({
      where: {
        projectId,
        userId,
        isRemoved: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
    })

    if (!member) throw new NotFoundException(`Member not found`)

    return member
  }
}
