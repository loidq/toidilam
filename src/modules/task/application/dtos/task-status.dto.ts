import { Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

import { StatusType } from '../../domain/enums/status-type.enum'

export class CreateTaskStatusDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  color: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  order: number

  @IsNotEmpty()
  @IsUUID(7)
  projectId: string

  @IsOptional()
  @IsEnum(StatusType)
  type?: StatusType
}

export class UpdateTaskStatusDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  color?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number

  @IsOptional()
  @IsEnum(StatusType)
  type?: StatusType
}

export class TaskStatusOrderDto {
  @IsNotEmpty()
  @IsUUID(7)
  id: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  order: number
}

export class UpdateTaskStatusOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskStatusOrderDto)
  statusOrders: TaskStatusOrderDto[]
}

export class TaskStatusListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID(7)
  projectId?: string
}

export class TaskStatusResponseDto {
  id: string
  name: string
  color: string
  order: number
  projectId: string
  type: StatusType
  createdAt?: Date
  updatedAt?: Date
}
