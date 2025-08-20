import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsDateString, IsUUID } from 'class-validator'

export class GetProjectReportDto {
  @ApiProperty({
    description: 'Array of project IDs to get report for',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @IsUUID(7, { each: true })
  projectIds: string[]

  @ApiProperty({
    description: 'Start date for the report duration',
    type: String,
    format: 'date-time',
    example: '2024-01-01T00:00:00.000Z',
  })
  @IsDateString()
  startDate: string

  @ApiProperty({
    description: 'End date for the report duration',
    type: String,
    format: 'date-time',
    example: '2024-12-31T23:59:59.999Z',
  })
  @IsDateString()
  endDate: string
}
