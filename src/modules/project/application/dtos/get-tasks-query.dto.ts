import { TaskPriority, TaskType } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class GetTasksQueryDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsEnum(TaskPriority, { each: true })
  priorities?: TaskPriority[]

  @IsOptional()
  @IsEnum(TaskType, { each: true })
  types?: TaskType[]

  @IsOptional()
  @IsUUID('7', { each: true })
  statusIds?: string[]

  @IsOptional()
  @IsUUID('7', { each: true })
  assigneeIds?: string[]

  @IsOptional()
  @IsUUID('7', { each: true })
  tagIds?: string[]

  @IsOptional()
  @IsNumber()
  page?: number

  @IsOptional()
  @IsNumber()
  limit?: number
}
