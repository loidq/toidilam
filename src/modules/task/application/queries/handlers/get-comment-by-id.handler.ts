import { Injectable, NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { CommentEntity } from '../../../domain/entities/comment.entity'
import { CommentPrismaRepository } from '../../../infrastructure/repositories/comment-prisma.repository'
import { GetCommentByIdQuery } from '../comment.queries'

@Injectable()
@QueryHandler(GetCommentByIdQuery)
export class GetCommentByIdQueryHandler implements IQueryHandler<GetCommentByIdQuery> {
  constructor(private readonly commentRepository: CommentPrismaRepository) {}

  async execute(query: GetCommentByIdQuery): Promise<CommentEntity> {
    const { commentId } = query

    const comment = await this.commentRepository.findById(commentId, {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    if (!comment) {
      throw new NotFoundException('Comment not found')
    }

    return comment
  }
}
