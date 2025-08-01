import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

import { ActivityTargetType } from '../../domain/enums/activity-target-type.enum'
import { ActivityType } from '../../domain/enums/activity-type.enum'

export class CreateActivityDto {
  @IsNotEmpty()
  @IsUUID(7)
  targetId: string

  @IsNotEmpty()
  @IsEnum(ActivityTargetType)
  targetType: ActivityTargetType

  @IsNotEmpty()
  @IsEnum(ActivityType)
  type: ActivityType

  @IsOptional()
  data?: Record<string, any>
}

export class UpdateActivityDto {
  @IsNotEmpty()
  data: Record<string, any>
}

export class ActivityListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID(7)
  targetId?: string

  @IsOptional()
  @IsEnum(ActivityTargetType)
  targetType?: ActivityTargetType

  @IsOptional()
  @IsEnum(ActivityType)
  type?: ActivityType

  @IsOptional()
  @IsUUID(7)
  createdBy?: string

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  includeData?: boolean
}

export class ActivityResponseDto {
  id: string
  targetId: string
  targetType: ActivityTargetType
  type: ActivityType
  data: Record<string, any>
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy?: string

  // Relations
  target?: any
  user?: any
}
