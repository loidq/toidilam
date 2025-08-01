import { Inject, Injectable } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { MemberRole, OrganizationRole } from '@prisma/client'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

import { CaslAbilityFactory } from './casl-ability.factory'
import { Action, AppAbility, Subject } from './permission.types'

@Injectable()
export class CaslService {
  constructor(
    @Inject(REQUEST) private readonly request: Record<string, any>,
    private prisma: PrismaService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  /**
   * Kiểm tra xem người dùng có quyền thực hiện action trên subject hay không
   */
  async canAccess(action: Action, subject: Subject, resourceId?: string): Promise<boolean> {
    const ability = await this.getAbilityForCurrentUser(resourceId)
    return ability.can(action, subject)
  }

  /**
   * Kiểm tra quyền truy cập vào dự án
   */
  async canAccessProject(action: Action, projectId: string): Promise<boolean> {
    const ability = await this.getAbilityForCurrentUser(projectId)
    return ability.can(action, Subject.PROJECT)
  }

  /**
   * Kiểm tra quyền truy cập vào tổ chức
   */
  async canAccessOrganization(action: Action, organizationId: string): Promise<boolean> {
    const ability = await this.getAbilityForCurrentUser(undefined, organizationId)
    return ability.can(action, Subject.ORGANIZATION)
  }

  /**
   * Kiểm tra quyền truy cập vào task
   */
  async canAccessTask(action: Action, taskId: string): Promise<boolean> {
    // Lấy projectId từ taskId
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: { projectId: true },
    })

    if (!task) return false

    const ability = await this.getAbilityForCurrentUser(task.projectId)
    return ability.can(action, Subject.TASK)
  }

  /**
   * Lấy ability cho người dùng hiện tại
   */
  async getAbilityForCurrentUser(projectId?: string, organizationId?: string): Promise<AppAbility> {
    const userId = this.request.user?.id

    if (!userId) {
      // Tạo ability cho khách (không đăng nhập)
      return this.caslAbilityFactory.createForUser({ userId: '' })
    }

    let orgRole: OrganizationRole | undefined
    let projectRole: MemberRole | undefined

    if (organizationId) {
      // Lấy thông tin vai trò trong tổ chức
      const orgMember = await this.prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId,
          },
        },
        select: { role: true },
      })
      orgRole = orgMember?.role
    }

    if (projectId) {
      // Lấy thông tin vai trò trong dự án
      const projectMember = await this.prisma.member.findFirst({
        where: {
          projectId,
          userId,
          isRemoved: false,
        },
        select: { role: true },
      })
      projectRole = projectMember?.role

      // Nếu không có organizationId, lấy từ project
      if (!organizationId) {
        const project = await this.prisma.project.findUnique({
          where: { id: projectId },
          select: { organizationId: true },
        })
        organizationId = project?.organizationId

        if (organizationId && !orgRole) {
          // Lấy thông tin vai trò trong tổ chức
          const orgMember = await this.prisma.organizationMember.findUnique({
            where: {
              organizationId_userId: {
                organizationId,
                userId,
              },
            },
            select: { role: true },
          })
          orgRole = orgMember?.role
        }
      }
    }

    // Tạo ability dựa trên vai trò
    return this.caslAbilityFactory.createForUser({
      userId,
      organizationId,
      projectId,
      orgRole: orgRole?.toString(),
      projectRole: projectRole?.toString(),
    })
  }
}
