import { ICommand } from '@nestjs/cqrs'

import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export class InviteMemberByEmailCommand implements ICommand {
  constructor(
    public readonly organizationId: string,
    public readonly email: string,
    public readonly invitedBy: string,
    public readonly role: OrgRole = OrgRole.MEMBER,
  ) {}
}
