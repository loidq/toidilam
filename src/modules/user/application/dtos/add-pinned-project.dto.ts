import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class AddPinnedProjectDto {
  @ApiProperty({
    description: 'Project ID to pin',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(7)
  projectId: string
}
