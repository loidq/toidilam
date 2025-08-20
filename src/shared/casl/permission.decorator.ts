import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { PermissionGuard } from './permission.guard'
import { Action, Subject } from './permission.types'

export const PERMISSION_KEY = 'permissions'

export interface IPermissionOptions {
  action: Action
  subject: Subject
  getProjectId?: (params: any) => string
  getOrgId?: (params: any) => string
  getResourceId?: (params: any) => string
  checkOwnership?: boolean
}

/**
 * Decorator quản lý phân quyền cho các endpoint
 * @example
 * @permission({ action: Action.READ, subject: Subject.PROJECT, getProjectId: (params) => params.projectId })
 */
export function permission(options: IPermissionOptions): MethodDecorator & ClassDecorator {
  return applyDecorators(SetMetadata(PERMISSION_KEY, options), UseGuards(PermissionGuard))
}
