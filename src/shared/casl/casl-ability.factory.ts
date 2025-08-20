import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { MemberRole, OrganizationRole } from '@prisma/client'

import { Action, AppAbility, ICustomRule, IPermissionData, Subject } from './permission.types'

@Injectable()
export class CaslAbilityFactory {
  /**
   * Tạo ability dựa trên dữ liệu quyền của người dùng
   */
  createForUser(data: IPermissionData): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)
    const { organizationId, projectId, orgRole, projectRole, userId } = data

    // Common permissions for all authenticated users
    this.defineDefaultRules(can)

    // Organization permissions
    if (organizationId && orgRole) {
      this.defineOrganizationRules(can, cannot, orgRole as OrganizationRole, organizationId, userId)
    }

    // Project permissions
    if (projectId && projectRole) {
      this.defineProjectRules(can, cannot, projectRole as MemberRole, projectId, userId)
    }

    return build()
  }

  /**
   * Định nghĩa các quyền mặc định cho mọi người dùng đã xác thực
   */
  private defineDefaultRules(can: AbilityBuilder<AppAbility>['can']): void {
    // Users can read and update their own profile
    can(Action.READ, Subject.USER, { id: { $eq: '$userId' } })
    can(Action.UPDATE, Subject.USER, { id: { $eq: '$userId' } })

    // Users can read their own memberships
    can(Action.READ, Subject.MEMBER, { userId: { $eq: '$userId' } })
    can(Action.READ, Subject.ORGANIZATION_MEMBER, { userId: { $eq: '$userId' } })

    // Users can leave organizations and projects
    can(Action.LEAVE, Subject.ORGANIZATION_MEMBER, { userId: { $eq: '$userId' } })
    can(Action.LEAVE, Subject.MEMBER, { userId: { $eq: '$userId' } })
  }

  /**
   * Định nghĩa các quyền dựa trên vai trò trong tổ chức
   */
  private defineOrganizationRules(
    can: AbilityBuilder<AppAbility>['can'],
    cannot: AbilityBuilder<AppAbility>['cannot'],
    role: OrganizationRole,
    organizationId: string,
    _userId: string,
  ): void {
    // Condition for this specific organization
    const orgCondition = { organizationId: { $eq: organizationId } }

    // Tất cả thành viên tổ chức đều có thể xem tổ chức
    can(Action.READ, Subject.ORGANIZATION, { id: { $eq: organizationId } })

    // All members can read projects and resources in their organization
    can(Action.READ, Subject.PROJECT, orgCondition)
    can(Action.READ, Subject.ORGANIZATION_MEMBER, orgCondition)
    can(Action.READ, Subject.APPLICATION, orgCondition)

    // Additional permissions based on role
    switch (role) {
      case OrganizationRole.ADMIN:
        // Admins can do everything within their organization
        can(Action.MANAGE, Subject.ALL, orgCondition)
        break

      case OrganizationRole.MANAGER:
        // Managers can create projects and invite members
        can(Action.CREATE, Subject.PROJECT, orgCondition)
        can(Action.UPDATE, Subject.ORGANIZATION, { id: { $eq: organizationId } })
        can(Action.INVITE, Subject.ORGANIZATION_MEMBER, orgCondition)
        can(Action.CREATE, Subject.ORGANIZATION_MEMBER, orgCondition)
        can(Action.READ, Subject.ORGANIZATION_MEMBER, orgCondition)
        can(Action.UPDATE, Subject.ORGANIZATION_MEMBER, orgCondition)
        can(Action.DELETE, Subject.ORGANIZATION_MEMBER, orgCondition)

        // Managers can create and manage applications
        can(Action.CREATE, Subject.APPLICATION, orgCondition)
        can(Action.UPDATE, Subject.APPLICATION, orgCondition)
        can(Action.DELETE, Subject.APPLICATION, orgCondition)
        break

      case OrganizationRole.MEMBER:
        // Basic members can only view organization resources
        // Permissions already defined in the common section
        break
    }
  }

  /**
   * Định nghĩa các quyền dựa trên vai trò trong dự án
   */
  private defineProjectRules(
    can: AbilityBuilder<AppAbility>['can'],
    cannot: AbilityBuilder<AppAbility>['cannot'],
    role: MemberRole,
    projectId: string,
    userId: string,
  ): void {
    // Condition for this specific project
    const projectCondition = { projectId: { $eq: projectId } }

    // Tất cả thành viên dự án đều có thể xem dự án
    can(Action.READ, Subject.PROJECT, { id: { $eq: projectId } })

    // All project members can read project resources
    can(Action.READ, Subject.PROJECT_VIEW, projectCondition)
    can(Action.READ, Subject.TASK, projectCondition)
    can(Action.READ, Subject.TASK_STATUS, projectCondition)
    can(Action.READ, Subject.TASK_TAG, projectCondition)
    can(Action.READ, Subject.COMMENT, projectCondition)
    can(Action.READ, Subject.VISION, projectCondition)
    can(Action.READ, Subject.DASHBOARD, projectCondition)
    can(Action.READ, Subject.MEMBER, projectCondition)

    // All members can create comments and manage their own timers
    can(Action.CREATE, Subject.COMMENT, projectCondition)
    can([Action.CREATE, Action.READ, Action.UPDATE, Action.DELETE], Subject.TIMER, {
      projectId: { $eq: projectId },
      userId: { $eq: userId },
    })

    // Additional permissions based on role
    switch (role) {
      case MemberRole.LEADER:
        // Leaders can do everything within their project
        can(Action.MANAGE, Subject.ALL, projectCondition)
        break

      case MemberRole.MANAGER:
        // Managers can create and update most project resources
        can([Action.CREATE, Action.UPDATE], Subject.PROJECT, { id: { $eq: projectId } })
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.PROJECT_VIEW, projectCondition)
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.TASK, projectCondition)
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.TASK_STATUS, projectCondition)
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.TASK_TAG, projectCondition)
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.VISION, projectCondition)
        can([Action.CREATE, Action.UPDATE, Action.DELETE], Subject.DASHBOARD, projectCondition)

        // Managers can invite and manage members (except leaders)
        can(Action.INVITE, Subject.MEMBER, projectCondition)
        can(Action.CREATE, Subject.MEMBER, projectCondition)
        can(Action.UPDATE, Subject.MEMBER, {
          projectId: { $eq: projectId },
          role: { $ne: MemberRole.LEADER },
        })
        can(Action.DELETE, Subject.MEMBER, {
          projectId: { $eq: projectId },
          role: { $ne: MemberRole.LEADER },
        })

        // Managers can assign tasks
        can(Action.ASSIGN, Subject.TASK, projectCondition)
        break

      case MemberRole.MEMBER:
        // Regular members can create and update their assigned tasks
        can(Action.CREATE, Subject.TASK, projectCondition)
        can(Action.UPDATE, Subject.TASK, {
          projectId: { $eq: projectId },
          taskAssignees: { $elemMatch: { userId: { $eq: userId } } },
        })

        // Members can update and delete their own comments
        can([Action.UPDATE, Action.DELETE], Subject.COMMENT, {
          projectId: { $eq: projectId },
          createdBy: { $eq: userId },
        })
        break

      case MemberRole.GUEST:
        // Guests have limited read-only access
        // Basic read permissions already granted above

        // Guests can only update and delete their own comments
        can([Action.UPDATE, Action.DELETE], Subject.COMMENT, {
          projectId: { $eq: projectId },
          createdBy: { $eq: userId },
        })
        break
    }
  }

  /**
   * Thêm rule tùy chỉnh vào ability hiện tại
   */
  addCustomRule(ability: AppAbility, rule: ICustomRule): AppAbility {
    const { action, subject, conditions, fields, inverted } = rule
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (inverted) {
      builder.cannot(action, subject, conditions)
    } else {
      // builder.can(action, subject, conditions, fields)
    }

    const newRules = builder.build().rules
    return new (ability.constructor as any)([...ability.rules, ...newRules])
  }
}
