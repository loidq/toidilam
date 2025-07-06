import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

import { InvitationStatus } from '@/modules/org/domain/entities/orgMember.entity'

export class RespondInvitationDto {
  @IsString()
  @IsNotEmpty()
  invitationId: string

  @IsEnum([InvitationStatus.ACCEPTED, InvitationStatus.REJECTED])
  status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED
}
