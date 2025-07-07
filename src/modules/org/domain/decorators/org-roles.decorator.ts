import { SetMetadata } from '@nestjs/common'

import { OrgRole } from '@/modules/org/domain/entities/org.entity'

export const ORG_ROLES_KEY = 'orgRoles'

/**
 * Decorator to specify required organization roles for accessing an endpoint
 * @param roles - Array of organization roles that are allowed to access the endpoint
 *
 * @example
 * @OrgRoles(OrgRole.ADMIN) // Only admins
 * @OrgRoles(OrgRole.ADMIN, OrgRole.MANAGER) // Admins and managers
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrgRoles = (...roles: OrgRole[]): any => SetMetadata(ORG_ROLES_KEY, roles)
