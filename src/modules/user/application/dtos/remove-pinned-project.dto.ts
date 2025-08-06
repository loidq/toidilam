import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class RemovePinnedProjectDto {
  @ApiProperty({
    description: 'Project ID to unpin',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID(7)
  projectId: string
}
