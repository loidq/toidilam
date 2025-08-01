import { Injectable } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { CommentEntity } from '../../../domain/entities/comment.entity'
import { CommentPrismaRepository } from '../../../infrastructure/repositories/comment-prisma.repository'
import { GetCommentsQuery } from '../comment.queries'

@Injectable()
@QueryHandler(GetCommentsQuery)
export class GetCommentsQueryHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(private readonly commentRepository: CommentPrismaRepository) {}

  async execute(query: GetCommentsQuery): Promise<{ comments: CommentEntity[]; total: number }> {
    const { taskId, projectId, search, page = 1, limit = 10 } = query

    const whereCondition: any = {}

    if (taskId) {
      whereCondition.taskId = taskId
    }

    if (projectId) {
      whereCondition.projectId = projectId
    }

    if (search) {
      whereCondition.content = {
        contains: search,
        mode: 'insensitive',
      }
    }

    const [comments, total] = await Promise.all([
      this.commentRepository.findMany({
        where: whereCondition,

        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.commentRepository.count({
        where: whereCondition,
      }),
    ])

    return { comments, total }
  }
}
