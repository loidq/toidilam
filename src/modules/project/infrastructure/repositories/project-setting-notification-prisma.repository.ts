import { Injectable } from '@nestjs/common'
import { ProjectSettingNotification as PrismaProjectSettingNotification } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

// ProjectSettingNotificationEntity chưa có, tạm dùng any
type ProjectSettingNotificationEntity = any

@Injectable()
export class ProjectSettingNotificationPrismaRepository
  extends BasePrismaRepository<
    ProjectSettingNotificationEntity,
    any,
    any,
    any,
    any,
    any,
    never,
    any,
    any,
    any,
    any,
    any
  >
  implements
    IBaseRepository<
      ProjectSettingNotificationEntity,
      any,
      any,
      any,
      any,
      any,
      never,
      any,
      any,
      any,
      any
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'projectSettingNotification')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaSetting: PrismaProjectSettingNotification,
  ): ProjectSettingNotificationEntity {
    return {
      id: prismaSetting.id,
      userId: prismaSetting.userId,
      projectId: prismaSetting.projectId,
      taskChanges: prismaSetting.taskChanges,
      remind: prismaSetting.remind,
      overdue: prismaSetting.overdue,
      createdAt: prismaSetting.createdAt,
      createdBy: prismaSetting.createdBy,
    }
  }

  protected toPrismaCreate(data: ProjectSettingNotificationEntity): any {
    return {
      taskChanges: data.taskChanges,
      remind: data.remind,
      overdue: data.overdue,
      createdBy: data.createdBy,
      user: {
        connect: { id: data.userId },
      },
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: ProjectSettingNotificationEntity): any {
    return {
      userId: data.userId,
      projectId: data.projectId,
      taskChanges: data.taskChanges,
      remind: data.remind,
      overdue: data.overdue,
      createdBy: data.createdBy,
    }
  }

  async findById(id: string, options?: any): Promise<ProjectSettingNotificationEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<ProjectSettingNotificationEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(
    projectId: string,
    options?: any,
  ): Promise<ProjectSettingNotificationEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }

  async findByUser(userId: string, options?: any): Promise<ProjectSettingNotificationEntity[]> {
    return this.findMany({ where: { userId }, ...options })
  }

  async findByUserAndProject(
    userId: string,
    projectId: string,
    options?: any,
  ): Promise<ProjectSettingNotificationEntity | null> {
    return this.findFirst({ where: { userId, projectId }, ...options })
  }
}
