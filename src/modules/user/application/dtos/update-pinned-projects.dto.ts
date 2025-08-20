import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsUUID } from 'class-validator'

export class UpdatePinnedProjectsDto {
  @ApiProperty({
    description: 'Array of project IDs to pin',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsArray()
  @IsUUID(7, { each: true })
  projectIds: string[]
}
