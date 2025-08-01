import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

import { DashboardComponentType } from '../../domain/enums/dashboard-component-type.enum'

export class CreateDashboardComponentDto {
  @ApiProperty({
    description: 'Dashboard ID that the component belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(7)
  dashboardId: string

  @ApiPropertyOptional({
    description: 'Component title',
    example: 'Task Summary',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Component type',
    enum: DashboardComponentType,
    example: DashboardComponentType.SUMMARY,
  })
  @IsOptional()
  @IsEnum(DashboardComponentType)
  type?: DashboardComponentType

  @ApiPropertyOptional({
    description: 'Component configuration',
    example: { chartType: 'bar', dataSource: 'tasks' },
  })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>

  @ApiPropertyOptional({
    description: 'X position in grid',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  x?: number

  @ApiPropertyOptional({
    description: 'Y position in grid',
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  y?: number

  @ApiPropertyOptional({
    description: 'Width in grid units',
    example: 6,
  })
  @IsOptional()
  @IsNumber()
  width?: number

  @ApiPropertyOptional({
    description: 'Height in grid units',
    example: 4,
  })
  @IsOptional()
  @IsNumber()
  height?: number
}

export class UpdateDashboardComponentDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Component title',
    example: 'Updated Component Title',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Component type',
    enum: DashboardComponentType,
    example: DashboardComponentType.SUMMARY,
  })
  @IsOptional()
  @IsEnum(DashboardComponentType)
  type?: DashboardComponentType

  @ApiPropertyOptional({
    description: 'Component configuration',
    example: { chartType: 'line', dataSource: 'activities' },
  })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>

  @ApiPropertyOptional({
    description: 'X position in grid',
    example: 2,
  })
  @IsOptional()
  @IsNumber()
  x?: number

  @ApiPropertyOptional({
    description: 'Y position in grid',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  y?: number

  @ApiPropertyOptional({
    description: 'Width in grid units',
    example: 8,
  })
  @IsOptional()
  @IsNumber()
  width?: number

  @ApiPropertyOptional({
    description: 'Height in grid units',
    example: 6,
  })
  @IsOptional()
  @IsNumber()
  height?: number
}

export class DashboardComponentListQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Dashboard ID to filter components',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID(7)
  dashboardId: string

  @ApiPropertyOptional({
    description: 'Component type to filter by',
    enum: DashboardComponentType,
    example: DashboardComponentType.LINE,
  })
  @IsOptional()
  @IsEnum(DashboardComponentType)
  type?: DashboardComponentType
}
