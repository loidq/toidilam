import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { CaslService } from './casl.service'
import { IPermissionOptions, PERMISSION_KEY } from './permission.decorator'
import { Subject } from './permission.types'
import { PolicyService } from './policy.service'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslService: CaslService,
    private policyService: PolicyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<IPermissionOptions>(PERMISSION_KEY, context.getHandler())

    if (!options) {
      return true // No permission options, allow access
    }

    const { action, subject, getProjectId, getOrgId, getResourceId, checkOwnership } = options
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException('Authentication required')
    }

    const params = { ...request.params, ...request.query, ...request.body }

    // Kiểm tra quyền dựa trên projectId nếu có
    if (getProjectId) {
      const projectId = getProjectId(params)
      if (projectId) {
        const canAccess = await this.caslService.canAccessProject(action, projectId)
        if (!canAccess) {
          throw new ForbiddenException(
            `You don't have permission to ${action} ${subject} in this project`,
          )
        }
        return true
      }
    }

    // Kiểm tra quyền dựa trên organizationId nếu có
    if (getOrgId) {
      const orgId = getOrgId(params)
      if (orgId) {
        const canAccess = await this.caslService.canAccessOrganization(action, orgId)
        if (!canAccess) {
          throw new ForbiddenException(
            `You don't have permission to ${action} ${subject} in this organization`,
          )
        }
        return true
      }
    }

    // Kiểm tra quyền truy cập tài nguyên cụ thể nếu có resourceId
    if (getResourceId) {
      const resourceId = getResourceId(params)
      if (resourceId) {
        if (subject === Subject.TASK) {
          const canAccess = await this.caslService.canAccessTask(action, resourceId)
          if (!canAccess) {
            throw new ForbiddenException(`You don't have permission to ${action} this ${subject}`)
          }

          // Kiểm tra quyền sở hữu nếu cần
          if (checkOwnership && user && user.id) {
            const isOwner = await this.policyService.isResourceOwner(
              user.id,
              subject.toString(),
              resourceId,
            )
            if (!isOwner) {
              throw new ForbiddenException(`You don't have permission to ${action} this ${subject}`)
            }
          }

          return true
        }
      }
    }

    // Kiểm tra quyền truy cập chung
    const canAccess = await this.caslService.canAccess(action, subject)
    if (!canAccess) {
      throw new ForbiddenException(`You don't have permission to ${action} ${subject}`)
    }

    return true
  }
}
