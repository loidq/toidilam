import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

export class CreateTaskPointDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  point: number

  @IsNotEmpty()
  @IsUUID(7)
  projectId: string

  @IsOptional()
  @IsString()
  icon?: string
}

export class UpdateTaskPointDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  point?: number

  @IsOptional()
  @IsString()
  icon?: string
}

export class TaskPointListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID(7)
  projectId?: string
}
