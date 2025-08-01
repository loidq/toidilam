import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsOptional()
  @IsUUID(7)
  projectId?: string
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string
}

export class CommentListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID(7)
  projectId?: string

  @IsOptional()
  @IsString()
  search?: string
}

export class TaskCommentIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  taskId: string

  @IsNotEmpty()
  @IsUUID(7)
  commentId: string
}

export class CommentResponseDto {
  id: string
  taskId: string
  content: string
  projectId?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy?: string

  // Relations
  task?: any
  project?: any
  user?: any
}
