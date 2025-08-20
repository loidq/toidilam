import { Transform } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

import { TaskPriority } from '../../domain/enums/task-priority.enum'
import { TaskType } from '../../domain/enums/task-type.enum'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsDateString()
  dueDate?: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  order: number

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @IsOptional()
  @IsString()
  cover?: string

  @IsOptional()
  @IsDateString()
  plannedStartDate?: string

  @IsOptional()
  @IsDateString()
  plannedDueDate?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsNotEmpty()
  @IsUUID(7)
  projectId: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @IsOptional()
  @IsUUID(7)
  taskStatusId?: string

  @IsOptional()
  @IsUUID(7)
  parentTaskId?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number

  @IsOptional()
  @IsBoolean()
  done?: boolean

  @IsOptional()
  @IsInt()
  @Min(1)
  taskPoint?: number

  @IsOptional()
  customFields?: Record<string, any>

  @IsOptional()
  @IsArray()
  @IsUUID(7, { each: true })
  assigneeIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID(7, { each: true })
  tagIds?: string[]
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsDateString()
  dueDate?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @IsOptional()
  @IsString()
  cover?: string

  @IsOptional()
  @IsDateString()
  plannedStartDate?: string

  @IsOptional()
  @IsDateString()
  plannedDueDate?: string

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @IsOptional()
  @IsUUID(7)
  taskStatusId?: string

  @IsOptional()
  @IsUUID(7)
  parentTaskId?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number

  @IsOptional()
  @IsBoolean()
  done?: boolean

  @IsOptional()
  @IsInt()
  @Min(1)
  taskPoint?: number

  @IsOptional()
  customFields?: Record<string, any>
}

export class TaskListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID(7)
  projectId?: string

  @IsOptional()
  @IsUUID(7)
  assigneeId?: string

  @IsOptional()
  @IsUUID(7)
  statusId?: string

  @IsOptional()
  @IsUUID(7)
  parentTaskId?: string

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @IsOptional()
  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  done?: boolean

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsDateString()
  dueDateFrom?: string

  @IsOptional()
  @IsDateString()
  dueDateTo?: string
}

export class AssignTaskDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(7, { each: true })
  userIds: string[]
}

export class UnassignTaskDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(7, { each: true })
  userIds: string[]
}

export class AddTaskTagDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(7, { each: true })
  tagIds: string[]
}

export class RemoveTaskTagDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(7, { each: true })
  tagIds: string[]
}

export class UpdateTaskProgressDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  progress: number
}

export class TaskResponseDto {
  id: string
  title: string
  desc?: string
  dueDate?: Date
  order: number
  type: TaskType
  checklistDone?: number
  checklistTodos?: number
  cover?: string
  plannedStartDate?: Date
  plannedDueDate?: Date
  startDate?: Date
  projectId: string
  priority?: TaskPriority
  taskStatusId?: string
  parentTaskId?: string
  progress?: number
  done: boolean
  taskPoint?: number
  customFields: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  createdBy: string
  updatedBy?: string
}
