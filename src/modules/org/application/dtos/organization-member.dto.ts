import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

import { InvitationStatus } from '@/modules/org/domain/entities/org-member.entity'
import { OrgRole } from '@/modules/org/domain/entities/org.entity'
import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

export { OrgMemberIdDto } from '@/shared/common/dtos/id.dto'

export class InviteOrgMemberByIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsOptional()
  @IsEnum(OrgRole)
  role?: OrgRole = OrgRole.MEMBER
}

export class InviteOrgMemberByEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsOptional()
  @IsEnum(OrgRole)
  role?: OrgRole = OrgRole.MEMBER
}

export class RespondOrgInvitationDto {
  @IsUUID(7)
  @IsNotEmpty()
  invitationId: string

  @IsEnum(InvitationStatus)
  status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED
}

export class GetOrgInvitationsQueryDto extends PaginationDto {}
export class GetOrgMembersQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string
}
export class SearchOrgMemberQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  search?: string
}
