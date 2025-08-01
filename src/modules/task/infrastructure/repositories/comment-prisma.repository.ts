import { Injectable } from '@nestjs/common'
import {
  Comment as PrismaComment,
  Project as PrismaProject,
  Task as PrismaTask,
} from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  CommentAggregateArgs,
  CommentBaseQueryOptions,
  CommentCreateInput,
  CommentCreateManyInput,
  CommentFindQueryOptions,
  CommentInclude,
  CommentOmit,
  CommentOrderByWithRelationInput,
  CommentScalarFieldEnum,
  CommentSelect,
  CommentUpdateInput,
  CommentWhereInput,
  CommentWhereUniqueInput,
} from '@/infrastructure/prisma/types/comment-query-options.types'

import { ProjectEntity } from '../../../project/domain/entities/project.entity'
import { CommentEntity } from '../../domain/entities/comment.entity'
import { TaskEntity } from '../../domain/entities/task.entity'

@Injectable()
export class CommentPrismaRepository
  extends BasePrismaRepository<
    CommentEntity,
    CommentWhereInput,
    CommentWhereUniqueInput,
    CommentCreateInput,
    CommentUpdateInput,
    CommentSelect,
    CommentInclude,
    CommentOrderByWithRelationInput,
    CommentScalarFieldEnum,
    CommentAggregateArgs,
    CommentOmit,
    CommentCreateManyInput
  >
  implements
    IBaseRepository<
      CommentEntity,
      CommentWhereInput,
      CommentWhereUniqueInput,
      CommentCreateInput,
      CommentUpdateInput,
      CommentSelect,
      CommentInclude,
      CommentOrderByWithRelationInput,
      CommentScalarFieldEnum,
      CommentAggregateArgs,
      CommentOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'comment')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaComment: PrismaComment & {
      task?: PrismaTask
      Project?: PrismaProject
      user?: {
        id: string
        name: string
        email: string
      }
    },
  ): CommentEntity {
    return new CommentEntity({
      id: prismaComment.id,
      taskId: prismaComment.taskId,
      content: prismaComment.content,
      projectId: prismaComment.projectId ?? undefined,
      createdAt: prismaComment.createdAt,
      updatedAt: prismaComment.updatedAt,
      createdBy: prismaComment.createdBy,
      updatedBy: prismaComment.updatedBy ?? undefined,
      task: prismaComment.task
        ? new TaskEntity({
            id: prismaComment.task.id,
            title: prismaComment.task.title,
            desc: prismaComment.task.desc ?? undefined,
            order: prismaComment.task.order,
            projectId: prismaComment.task.projectId,
            createdBy: prismaComment.task.createdBy,
            done: prismaComment.task.done,
          })
        : undefined,
      project: prismaComment.Project
        ? new ProjectEntity({
            id: prismaComment.Project.id,
            name: prismaComment.Project.name,
            organizationId: prismaComment.Project.organizationId,
            createdBy: prismaComment.Project.createdBy,
            isArchived: prismaComment.Project.isArchived,
            countMemberTask: prismaComment.Project.countMemberTask,
            countProjectTask: prismaComment.Project.countProjectTask,
          })
        : undefined,
    })
  }

  protected toPrismaCreate(data: CommentEntity): CommentCreateInput {
    return {
      content: data.content,
      user: {
        connect: { id: data.createdBy },
      },
      task: {
        connect: { id: data.taskId },
      },
      project: data.projectId
        ? {
            connect: { id: data.projectId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: CommentEntity): CommentCreateManyInput {
    return {
      taskId: data.taskId,
      content: data.content,
      projectId: data.projectId,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    }
  }

  async findById(id: string, options?: CommentBaseQueryOptions): Promise<CommentEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: CommentFindQueryOptions): Promise<CommentEntity | null> {
    return this.findFirst(options)
  }
}
