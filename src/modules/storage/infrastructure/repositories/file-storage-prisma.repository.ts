import { Injectable } from '@nestjs/common'
import {
  FileStorage as PrismaFileStorage,
  Organization as PrismaOrganization,
  Project as PrismaProject,
  Task as PrismaTask,
} from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  FileStorageAggregateArgs,
  FileStorageBaseQueryOptions,
  FileStorageCreateInput,
  FileStorageCreateManyInput,
  FileStorageFindQueryOptions,
  FileStorageInclude,
  FileStorageOmit,
  FileStorageOrderByWithRelationInput,
  FileStorageScalarFieldEnum,
  FileStorageSelect,
  FileStorageUpdateInput,
  FileStorageWhereInput,
  FileStorageWhereUniqueInput,
} from '@/infrastructure/prisma/types/file-storage-query-options.types'

import { OrgEntity } from '../../../org/domain/entities/org.entity'
import { ProjectEntity } from '../../../project/domain/entities/project.entity'
import { TaskEntity } from '../../../task/domain/entities/task.entity'
import { FileStorageEntity } from '../../domain/entities/file-storage.entity'
import { FileOwnerType } from '../../domain/enums/file-owner-type.enum'
import { FileType } from '../../domain/enums/file-type.enum'

@Injectable()
export class FileStoragePrismaRepository
  extends BasePrismaRepository<
    FileStorageEntity,
    FileStorageWhereInput,
    FileStorageWhereUniqueInput,
    FileStorageCreateInput,
    FileStorageUpdateInput,
    FileStorageSelect,
    FileStorageInclude,
    FileStorageOrderByWithRelationInput,
    FileStorageScalarFieldEnum,
    FileStorageAggregateArgs,
    FileStorageOmit,
    FileStorageCreateManyInput
  >
  implements
    IBaseRepository<
      FileStorageEntity,
      FileStorageWhereInput,
      FileStorageWhereUniqueInput,
      FileStorageCreateInput,
      FileStorageUpdateInput,
      FileStorageSelect,
      FileStorageInclude,
      FileStorageOrderByWithRelationInput,
      FileStorageScalarFieldEnum,
      FileStorageAggregateArgs,
      FileStorageOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'fileStorage')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaFileStorage: PrismaFileStorage & {
      organization?: PrismaOrganization
      project?: PrismaProject
      task?: PrismaTask
    },
  ): FileStorageEntity {
    return new FileStorageEntity({
      id: prismaFileStorage.id,
      organizationId: prismaFileStorage.organizationId ?? undefined,
      projectId: prismaFileStorage.projectId ?? undefined,
      taskId: prismaFileStorage.taskId ?? undefined,
      name: prismaFileStorage.name,
      keyName: prismaFileStorage.keyName,
      type: prismaFileStorage.type as FileType,
      url: prismaFileStorage.url ?? undefined,
      size: prismaFileStorage.size ?? undefined,
      mimeType: prismaFileStorage.mimeType ?? undefined,
      parentId: prismaFileStorage.parentId ?? undefined,
      owner: prismaFileStorage.owner ?? undefined,
      ownerType: prismaFileStorage.ownerType as FileOwnerType,
      isDeleted: prismaFileStorage.isDeleted,
      createdAt: prismaFileStorage.createdAt,
      deletedAt: prismaFileStorage.deletedAt ?? undefined,
      deletedBy: prismaFileStorage.deletedBy ?? undefined,
      createdBy: prismaFileStorage.createdBy,
      organization: prismaFileStorage.organization
        ? new OrgEntity({
            id: prismaFileStorage.organization.id,
            name: prismaFileStorage.organization.name,
            slug: prismaFileStorage.organization.slug,
            createdBy: prismaFileStorage.organization.createdBy,
          })
        : undefined,
      project: prismaFileStorage.project
        ? new ProjectEntity({
            id: prismaFileStorage.project.id,
            name: prismaFileStorage.project.name,
            organizationId: prismaFileStorage.project.organizationId,
            createdBy: prismaFileStorage.project.createdBy,
            isArchived: prismaFileStorage.project.isArchived,
            countMemberTask: prismaFileStorage.project.countMemberTask,
            countProjectTask: prismaFileStorage.project.countProjectTask,
          })
        : undefined,
      task: prismaFileStorage.task
        ? new TaskEntity({
            id: prismaFileStorage.task.id,
            title: prismaFileStorage.task.title,
            desc: prismaFileStorage.task.desc ?? undefined,
            order: prismaFileStorage.task.order,
            projectId: prismaFileStorage.task.projectId,
            createdBy: prismaFileStorage.task.createdBy,
            done: prismaFileStorage.task.done,
          })
        : undefined,
    })
  }

  protected toPrismaCreate(data: FileStorageEntity): FileStorageCreateInput {
    return {
      name: data.name,
      keyName: data.keyName,
      type: data.type,
      url: data.url,
      size: data.size,
      mimeType: data.mimeType,
      parentId: data.parentId,
      owner: data.owner,
      ownerType: data.ownerType,
      isDeleted: data.isDeleted,
      createdBy: data.createdBy,
      deletedBy: data.deletedBy,
      organization: data.organizationId
        ? {
            connect: { id: data.organizationId },
          }
        : undefined,
      project: data.projectId
        ? {
            connect: { id: data.projectId },
          }
        : undefined,
      task: data.taskId
        ? {
            connect: { id: data.taskId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: FileStorageEntity): FileStorageCreateManyInput {
    return {
      organizationId: data.organizationId,
      projectId: data.projectId,
      taskId: data.taskId,
      name: data.name,
      keyName: data.keyName,
      type: data.type,
      url: data.url,
      size: data.size,
      mimeType: data.mimeType,
      parentId: data.parentId,
      owner: data.owner,
      ownerType: data.ownerType,
      isDeleted: data.isDeleted,
      createdBy: data.createdBy,
      deletedBy: data.deletedBy,
    }
  }

  async findById(
    id: string,
    options?: FileStorageBaseQueryOptions,
  ): Promise<FileStorageEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: FileStorageFindQueryOptions): Promise<FileStorageEntity | null> {
    return this.findFirst(options)
  }
}
