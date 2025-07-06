import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator'

export class UpdateOrgDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
