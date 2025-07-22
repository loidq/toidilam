import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'
export { OrganizationIdDto } from '@/shared/common/dtos/id.dto'
export class CreateOrgDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  slug: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsUrl()
  cover?: string

  @IsOptional()
  @IsUrl()
  avatar?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxStorageSize?: number
}

export class UpdateOrgDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  slug?: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsUrl()
  cover?: string

  @IsOptional()
  @IsUrl()
  avatar?: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxStorageSize?: number
}

export class GetOrgBySlugDto {
  @IsString()
  @IsNotEmpty()
  slug: string
}

export class OrgListQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string
}
