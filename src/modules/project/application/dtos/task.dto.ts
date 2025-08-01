import { TaskPriority, TaskType } from '@prisma/client'
import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsArray()
  @IsUUID('7', { each: true })
  assigneeIds?: string[]

  @IsOptional()
  @IsUUID('7')
  taskStatusId?: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @IsOptional()
  @IsArray()
  @IsUUID('7', { each: true })
  tagIds?: string[]

  @IsOptional()
  dueDate?: Date
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsArray()
  @IsUUID('7', { each: true })
  assigneeIds?: string[]

  @IsOptional()
  @IsUUID('7')
  taskStatusId?: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @IsOptional()
  @IsArray()
  @IsUUID('7', { each: true })
  tagIds?: string[]

  @IsOptional()
  dueDate?: Date

  @IsOptional()
  progress?: number

  @IsOptional()
  done?: boolean
}
