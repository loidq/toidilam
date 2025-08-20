import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'

import { PaginationDto, ProjectIdDto } from '@/shared/common/dtos'

import { MemberRole } from '../../domain/enums/member.enum'

export { ProjectIdDto }

export class MemberListQueryDto extends PaginationDto {}

export class MemberDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsEnum(MemberRole)
  role: MemberRole
}

export class AddMemberDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  members: MemberDto[]
}

export class UpdateMemberRoleDto {
  @IsEnum(MemberRole)
  role: MemberRole

  @IsNotEmpty()
  @IsUUID()
  memberId: string
}

export class MemberIdDto {
  @IsNotEmpty()
  @IsUUID()
  memberId: string
}

export class DeleteMemberDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string

  @IsNotEmpty()
  @IsUUID()
  memberId: string
}
