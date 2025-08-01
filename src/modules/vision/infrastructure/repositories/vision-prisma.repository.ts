import { Injectable } from '@nestjs/common'
import {
  Organization as PrismaOrganization,
  Project as PrismaProject,
  Vision as PrismaVision,
} from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  VisionAggregateArgs,
  VisionBaseQueryOptions,
  VisionCreateInput,
  VisionCreateManyInput,
  VisionFindQueryOptions,
  VisionInclude,
  VisionOmit,
  VisionOrderByWithRelationInput,
  VisionScalarFieldEnum,
  VisionSelect,
  VisionUpdateInput,
  VisionWhereInput,
  VisionWhereUniqueInput,
} from '@/infrastructure/prisma/types/vision-query-options.types'

import { OrgEntity } from '../../../org/domain/entities/org.entity'
import { ProjectEntity } from '../../../project/domain/entities/project.entity'
import { VisionEntity } from '../../domain/entities/vision.entity'

@Injectable()
export class VisionPrismaRepository
  extends BasePrismaRepository<
    VisionEntity,
    VisionWhereInput,
    VisionWhereUniqueInput,
    VisionCreateInput,
    VisionUpdateInput,
    VisionSelect,
    VisionInclude,
    VisionOrderByWithRelationInput,
    VisionScalarFieldEnum,
    VisionAggregateArgs,
    VisionOmit,
    VisionCreateManyInput
  >
  implements
    IBaseRepository<
      VisionEntity,
      VisionWhereInput,
      VisionWhereUniqueInput,
      VisionCreateInput,
      VisionUpdateInput,
      VisionSelect,
      VisionInclude,
      VisionOrderByWithRelationInput,
      VisionScalarFieldEnum,
      VisionAggregateArgs,
      VisionOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'vision')
  }

  // Implement abstract mapper methods
  protected toDomain(
    prismaVision: PrismaVision & {
      project?: PrismaProject
      organization?: PrismaOrganization
      parent?: PrismaVision
      children?: PrismaVision[]
    },
  ): VisionEntity {
    return new VisionEntity({
      id: prismaVision.id,
      name: prismaVision.name,
      startDate: prismaVision.startDate ?? undefined,
      dueDate: prismaVision.dueDate ?? undefined,
      progress: prismaVision.progress ?? undefined,
      projectId: prismaVision.projectId ?? undefined,
      organizationId: prismaVision.organizationId ?? undefined,
      parentId: prismaVision.parentId ?? undefined,
      createdAt: prismaVision.createdAt,
      createdBy: prismaVision.createdBy,
      updatedAt: prismaVision.updatedAt,
      updatedBy: prismaVision.updatedBy ?? undefined,
      project: prismaVision.project
        ? new ProjectEntity({
            id: prismaVision.project.id,
            name: prismaVision.project.name,
            organizationId: prismaVision.project.organizationId,
            createdBy: prismaVision.project.createdBy,
            isArchived: prismaVision.project.isArchived,
            countMemberTask: prismaVision.project.countMemberTask,
            countProjectTask: prismaVision.project.countProjectTask,
          })
        : undefined,
      organization: prismaVision.organization
        ? new OrgEntity({
            id: prismaVision.organization.id,
            name: prismaVision.organization.name,
            slug: prismaVision.organization.slug,
            createdBy: prismaVision.organization.createdBy,
          })
        : undefined,
      parent: prismaVision.parent
        ? new VisionEntity({
            id: prismaVision.parent.id,
            name: prismaVision.parent.name,
            createdBy: prismaVision.parent.createdBy,
          })
        : undefined,
      children:
        prismaVision.children?.map(
          child =>
            new VisionEntity({
              id: child.id,
              name: child.name,
              createdBy: child.createdBy,
            }),
        ) ?? [],
    })
  }

  protected toPrismaCreate(data: VisionEntity): VisionCreateInput {
    return {
      name: data.name,
      startDate: data.startDate,
      dueDate: data.dueDate,
      progress: data.progress,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
      project: data.projectId
        ? {
            connect: { id: data.projectId },
          }
        : undefined,
      organization: data.organizationId
        ? {
            connect: { id: data.organizationId },
          }
        : undefined,
      parent: data.parentId
        ? {
            connect: { id: data.parentId },
          }
        : undefined,
    }
  }

  protected toPrismaCreateManyInput(data: VisionEntity): VisionCreateManyInput {
    return {
      name: data.name,
      startDate: data.startDate,
      dueDate: data.dueDate,
      progress: data.progress,
      projectId: data.projectId,
      organizationId: data.organizationId,
      parentId: data.parentId,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    }
  }

  async findById(id: string, options?: VisionBaseQueryOptions): Promise<VisionEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: VisionFindQueryOptions): Promise<VisionEntity | null> {
    return this.findFirst(options)
  }
}
