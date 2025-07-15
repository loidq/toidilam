import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class GetOrgMembersQueryDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string))
  page?: number

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string))
  limit?: number

  @ApiProperty({
    description: 'Search term for filtering members by name or email',
    example: 'john',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string
}
