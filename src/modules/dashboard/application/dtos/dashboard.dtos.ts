import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'
export class CreateDashboardDto {
  @ApiPropertyOptional({
    description: 'Dashboard title',
    example: 'Project Overview',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({
    description: 'Project ID that the dashboard belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(7)
  projectId: string

  @ApiPropertyOptional({
    description: 'Whether this is the default dashboard for the project',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}

export class DashboardListQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Project ID to filter dashboards',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID(7)
  projectId: string

  @ApiPropertyOptional({
    description: 'Filter by default dashboard',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}

export class UpdateDashboardDto {
  @ApiPropertyOptional({
    description: 'Dashboard title',
    example: 'Updated Dashboard Title',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Whether this is the default dashboard for the project',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean
}

export class DashboardQuerySummaryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Project ID to filter dashboards',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsArray()
  @IsUUID(7, { each: true })
  projectIds?: string[]

  @IsOptional()
  @IsArray()
  @IsUUID(7, { each: true })
  statusIds?: string[]

  @IsOptional()
  startDate?: Date
  @IsOptional()
  endDate?: Date

  @IsOptional()
  @IsArray()
  @IsUUID(7, { each: true })
  assigneeIds?: string[]

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  priority?: string[]
}
