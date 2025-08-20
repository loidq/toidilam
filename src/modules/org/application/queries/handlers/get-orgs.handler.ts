import { Inject } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { OrgFindQueryOptions } from '@/infrastructure/prisma/types/org-query-options.types'
import { OrgEntity } from '@/modules/org/domain/entities/org.entity'
import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'

import { GetOrgsQuery } from '../org.queries'

@QueryHandler(GetOrgsQuery)
export class GetOrgsQueryHandler implements IQueryHandler<GetOrgsQuery> {
  constructor(@Inject('ORG_REPOSITORY') private readonly orgRepository: IOrgRepository) {}

  async execute({ page, limit, search }: GetOrgsQuery): Promise<OrgEntity[]> {
    const queryOptions: OrgFindQueryOptions = {
      ...(page &&
        limit && {
          skip: (page - 1) * limit,
          take: limit,
        }),
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { desc: { contains: search, mode: 'insensitive' } },
          ],
        },
      }),
      orderBy: {
        createdAt: 'desc',
      },
    }
    return await this.orgRepository.findMany(queryOptions)
  }
}
