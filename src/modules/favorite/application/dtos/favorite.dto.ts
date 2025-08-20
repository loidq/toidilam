import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  icon: string

  @IsNotEmpty()
  @IsString()
  link: string

  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsUUID()
  organizationId: string

  @IsNotEmpty()
  @IsString()
  type: string
}

export class GetFavoritesByOrganizationQueryDto {
  @IsNotEmpty()
  @IsUUID()
  organizationId: string
}

export class FavoriteResponseDto {
  id: string
  name: string
  icon: string
  link: string
  userId: string
  organizationId: string
  type: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy?: string
}
