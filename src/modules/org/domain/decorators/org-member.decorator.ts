import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { OrgMemberEntity } from '@/modules/org/domain/entities/org-member.entity'

import { IRequestWithOrgMember } from '../types/request-with-org-member.type'

/**
 * Decorator to extract the current user's organization membership from the request
 * This decorator should be used after OrganizationRoleGuard
 *
 * @example
 * async updateOrg(@OrgMember() orgMember: OrgMemberEntity) {
 *   // orgMember contains user's role and membership info
 * }
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrgMember = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): OrgMemberEntity => {
    const request = ctx.switchToHttp().getRequest<IRequestWithOrgMember>()

    if (!request.orgMember) {
      throw new Error('OrgMember not found in request. Make sure OrganizationRoleGuard is applied.')
    }

    return request.orgMember
  },
)
