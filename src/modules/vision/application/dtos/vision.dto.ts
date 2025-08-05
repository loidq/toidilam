import { Type } from 'class-transformer'
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator'

export class CreateVisionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number

  @IsOptional()
  @IsUUID(7)
  projectId?: string

  @IsOptional()
  @IsUUID(7)
  organizationId?: string

  @IsOptional()
  @IsUUID(7)
  parentId?: string
}

export class UpdateVisionDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  progress?: number
}

export class VisionListQueryDto {
  @IsOptional()
  @IsUUID(7)
  projectId?: string

  @IsOptional()
  @IsUUID(7)
  organizationId?: string

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number
}

export class VisionResponseDto {
  id: string
  name: string
  startDate?: Date
  dueDate?: Date
  progress?: number
  projectId?: string
  organizationId?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy?: string
}
