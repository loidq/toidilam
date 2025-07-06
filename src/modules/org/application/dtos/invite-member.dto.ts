import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export class InviteMemberDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string

  @IsString()
  @IsNotEmpty()
  userId: string

  @IsOptional()
  @IsEnum(OrgRole)
  role?: OrgRole = OrgRole.MEMBER
}
