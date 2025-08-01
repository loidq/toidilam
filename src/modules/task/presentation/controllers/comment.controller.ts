import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { JwtAuthGuard } from '@/modules/auth/domain/guards/jwt-auth.guard'
import { TaskIdDto } from '@/shared/common/dtos/id.dto'
import { ResponseBuilderService } from '@/shared/common/services/response-builder.service'

import {
  CreateCommentCommand,
  DeleteCommentCommand,
  UpdateCommentCommand,
} from '../../application/commands/comment.commands'
import {
  CommentListQueryDto,
  CreateCommentDto,
  TaskCommentIdDto,
  UpdateCommentDto,
} from '../../application/dtos/comment.dto'
import { GetCommentByIdQuery, GetCommentsQuery } from '../../application/queries/comment.queries'

@ApiTags('Task Comments')
@ApiBearerAuth()
@Controller('task/:taskId/comment')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseBuilder: ResponseBuilderService,
  ) {}

  @Post()
  async createComment(
    @Param() { taskId }: TaskIdDto,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { content, projectId } = createCommentDto

    const command = new CreateCommentCommand({
      taskId,
      content,
      createdBy: userId,
      projectId,
    })

    const comment = await this.commandBus.execute(command)
    return this.responseBuilder.created(comment, 'Comment created successfully')
  }

  @Get()
  async getComments(
    @Param() { taskId }: TaskIdDto,
    @Query() queryDto: CommentListQueryDto,
  ): Promise<any> {
    const { projectId, search, page, limit } = queryDto

    const query = new GetCommentsQuery({
      taskId,
      projectId,
      search,
      page,
      limit,
    })

    const result = await this.queryBus.execute(query)
    const { comments, total } = result as { comments: any[]; total: number }

    return this.responseBuilder.success(comments, 'Comments retrieved successfully', {
      total,
      page,
      limit,
    })
  }

  @Get(':commentId')
  async getComment(@Param() { commentId, taskId }: TaskCommentIdDto): Promise<any> {
    const query = new GetCommentByIdQuery(commentId)
    const comment = await this.queryBus.execute(query)
    return this.responseBuilder.success(comment, 'Comment retrieved successfully')
  }

  @Put(':commentId')
  async updateComment(
    @Param() { commentId }: TaskCommentIdDto,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request,
  ): Promise<any> {
    const { userId } = req.user as IJwtPayload
    const { content } = updateCommentDto

    const command = new UpdateCommentCommand({
      commentId,
      content,
      updatedBy: userId,
    })

    const comment = await this.commandBus.execute(command)
    return this.responseBuilder.updated(comment, 'Comment updated successfully')
  }

  @Delete(':commentId')
  async deleteComment(@Param() { commentId }: TaskCommentIdDto, @Req() req: Request): Promise<any> {
    const { userId } = req.user as IJwtPayload

    const command = new DeleteCommentCommand({
      commentId,
      deletedBy: userId,
    })

    await this.commandBus.execute(command)
    return this.responseBuilder.deleted('Comment deleted successfully')
  }
}
