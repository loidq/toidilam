import { ICommand } from '@nestjs/cqrs'

import { InvitationStatus } from '@/modules/org/domain/entities/orgMember.entity'

export class RespondInvitationCommand implements ICommand {
  constructor(
    public readonly invitationId: string,
    public readonly userId: string,
    public readonly status: InvitationStatus.ACCEPTED | InvitationStatus.REJECTED,
  ) {}
}
