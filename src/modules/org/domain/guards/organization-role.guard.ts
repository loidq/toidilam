import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { isUUID } from 'class-validator'

import { InvitationStatus } from '@/modules/org/domain/entities/org-member.entity'
import { OrgRole } from '@/modules/org/domain/entities/org.entity'
import { IOrgMemberRepository } from '@/modules/org/domain/repositories/org-member.repository'

import { ORG_ROLES_KEY } from '../decorators/org-roles.decorator'
import { IRequestWithOrgMember } from '../types/request-with-org-member.type'
/**
 * Guard to check if the user has the required organization role
 */
@Injectable()
export class OrganizationRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('ORG_MEMBER_REPOSITORY')
    private readonly orgMemberRepository: IOrgMemberRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles from decorator
    const requiredRoles = this.reflector.getAllAndOverride<OrgRole[]>(ORG_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // If no roles required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<IRequestWithOrgMember>()
    const user = request.user

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    // Extract organization ID from URL parameters
    const orgId = request.params.orgId || request.params.organizationId

    if (!orgId) {
      throw new ForbiddenException('Organization ID not found in request')
    }
    if (!orgId || !isUUID(orgId, 7)) {
      throw new ForbiddenException('Invalid organization ID')
    }

    // Check user's role in the organization
    const orgMember = await this.orgMemberRepository.findOne({
      where: {
        organizationId: orgId,
        userId: user.userId,
        status: InvitationStatus.ACCEPTED, // Only accepted members
      },
    })

    if (!orgMember) {
      throw new ForbiddenException('User is not a member of this organization')
    }

    // Check if user's role is sufficient
    const hasRequiredRole = this.checkRoleHierarchy(orgMember.role, requiredRoles)

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}`,
      )
    }

    // Store orgMember in request for later use
    request.orgMember = orgMember

    return true
  }

  /**
   * Check if user's role satisfies any of the required roles
   * Role hierarchy: ADMIN > MANAGER > MEMBER
   */
  private checkRoleHierarchy(userRole: OrgRole, requiredRoles: OrgRole[]): boolean {
    const roleHierarchy = {
      [OrgRole.MEMBER]: 1,
      [OrgRole.MANAGER]: 2,
      [OrgRole.ADMIN]: 3,
    }

    const userRoleLevel = roleHierarchy[userRole]

    return requiredRoles.some(requiredRole => {
      const requiredRoleLevel = roleHierarchy[requiredRole]
      return userRoleLevel >= requiredRoleLevel
    })
  }
}
