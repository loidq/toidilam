import { IsEnum } from 'class-validator'

import { InvitationStatus } from '@/modules/org/domain/entities/orgMember.entity'

export class RespondInvitationDto {
  @IsEnum([InvitationStatus.ACCEPTED, InvitationStatus.REJECTED])
  status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED
}
