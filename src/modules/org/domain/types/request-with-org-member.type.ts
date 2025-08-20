import { Request as ExpressRequest } from 'express'

import { IJwtPayload } from '@/modules/auth/application/services/jwt.service'
import { OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'

export interface IRequestWithOrgMember extends ExpressRequest {
  user: IJwtPayload
  orgMember?: OrgMemberEntity
}
