import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export class InviteMemberByEmailDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  @IsEnum(OrgRole)
  role?: OrgRole = OrgRole.MEMBER
}
