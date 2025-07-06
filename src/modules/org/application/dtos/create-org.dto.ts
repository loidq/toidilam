import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator'

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
