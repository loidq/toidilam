import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator'

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
