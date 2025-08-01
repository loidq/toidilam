import { Injectable } from '@nestjs/common'
import { MemberRole, OrganizationRole } from '@prisma/client'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

import { Action, Subject } from './permission.types'

/**
 * Service quản lý và kiểm tra các chính sách phân quyền
 */
@Injectable()
export class PolicyService {
  constructor(private prisma: PrismaService) {}

  /**
   * Kiểm tra xem người dùng có phải là thành viên của dự án hay không
   */
  async isProjectMember(userId: string, projectId: string): Promise<boolean> {
    const member = await this.prisma.member.findFirst({
      where: {
        userId,
        projectId,
        isRemoved: false,
      },
    })
    return !!member
  }

  /**
   * Kiểm tra vai trò của người dùng trong dự án
   */
  async getProjectRole(userId: string, projectId: string): Promise<MemberRole | null> {
    const member = await this.prisma.member.findFirst({
      where: {
        userId,
        projectId,
        isRemoved: false,
      },
      select: { role: true },
    })
    return member?.role || null
  }

  /**
   * Kiểm tra xem người dùng có phải là thành viên của tổ chức hay không
   */
  async isOrganizationMember(userId: string, organizationId: string): Promise<boolean> {
    const member = await this.prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    })
    return !!member && member.status !== 'REJECTED' && !member.isRemoved
  }

  /**
   * Kiểm tra vai trò của người dùng trong tổ chức
   */
  async getOrganizationRole(
    userId: string,
    organizationId: string,
  ): Promise<OrganizationRole | null> {
    const member = await this.prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      select: { role: true },
    })
    return member?.role || null
  }

  /**
   * Kiểm tra xem người dùng có phải là chủ sở hữu của tài nguyên hay không
   */
  async isResourceOwner(
    userId: string,
    resourceType: string,
    resourceId: string,
  ): Promise<boolean> {
    switch (resourceType) {
      case Subject.TASK.toString(): {
        const task = await this.prisma.task.findUnique({
          where: { id: resourceId },
          select: { createdBy: true },
        })
        return task?.createdBy === userId
      }

      case Subject.COMMENT.toString(): {
        const comment = await this.prisma.comment.findUnique({
          where: { id: resourceId },
          select: { createdBy: true },
        })
        return comment?.createdBy === userId
      }

      case Subject.PROJECT.toString(): {
        const project = await this.prisma.project.findUnique({
          where: { id: resourceId },
          select: { createdBy: true },
        })
        return project?.createdBy === userId
      }

      case Subject.ORGANIZATION.toString(): {
        const organization = await this.prisma.organization.findUnique({
          where: { id: resourceId },
          select: { createdBy: true },
        })
        return organization?.createdBy === userId
      }

      default:
        return false
    }
  }

  /**
   * Kiểm tra xem người dùng có được gán cho task hay không
   */
  async isTaskAssignee(userId: string, taskId: string): Promise<boolean> {
    const assignment = await this.prisma.taskAssignee.findUnique({
      where: {
        taskId_userId: {
          taskId,
          userId,
        },
      },
    })
    return !!assignment
  }

  /**
   * Lấy tất cả các dự án mà người dùng có quyền truy cập
   */
  async getAccessibleProjects(userId: string, action: Action): Promise<string[]> {
    // Lấy tất cả các dự án mà người dùng là thành viên
    const memberProjects = await this.prisma.member.findMany({
      where: {
        userId,
        isRemoved: false,
      },
      select: { projectId: true, role: true },
    })

    // Lọc dựa trên action và vai trò
    const accessibleProjectIds = memberProjects
      .filter(project => {
        const role = project.role

        switch (action) {
          case Action.READ:
            // Tất cả vai trò đều có thể đọc
            return true

          case Action.CREATE:
            // Chỉ LEADER, MANAGER và MEMBER có thể tạo
            return (
              role === MemberRole.LEADER ||
              role === MemberRole.MANAGER ||
              role === MemberRole.MEMBER
            )

          case Action.UPDATE:
          case Action.DELETE:
            // Chỉ LEADER và MANAGER có thể cập nhật/xóa
            return role === MemberRole.LEADER || role === MemberRole.MANAGER

          case Action.MANAGE:
            // Chỉ LEADER có thể quản lý toàn diện
            return role === MemberRole.LEADER

          default:
            return false
        }
      })
      .map(p => p.projectId)

    return accessibleProjectIds
  }
}
