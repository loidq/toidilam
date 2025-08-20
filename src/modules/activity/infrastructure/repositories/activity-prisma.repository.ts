import { Injectable } from '@nestjs/common'
import { Activity as PrismaActivity } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'
import {
  ActivityAggregateArgs,
  ActivityBaseQueryOptions,
  ActivityCreateInput,
  ActivityCreateManyInput,
  ActivityFindQueryOptions,
  ActivityOmit,
  ActivityOrderByWithRelationInput,
  ActivityScalarFieldEnum,
  ActivitySelect,
  ActivityUpdateInput,
  ActivityWhereInput,
  ActivityWhereUniqueInput,
} from '@/infrastructure/prisma/types/activity-query-options.types'

import { ActivityEntity } from '../../domain/entities/activity.entity'
import { ActivityTargetType } from '../../domain/enums/activity-target-type.enum'
import { ActivityType } from '../../domain/enums/activity-type.enum'

@Injectable()
export class ActivityPrismaRepository
  extends BasePrismaRepository<
    ActivityEntity,
    ActivityWhereInput,
    ActivityWhereUniqueInput,
    ActivityCreateInput,
    ActivityUpdateInput,
    ActivitySelect,
    never,
    ActivityOrderByWithRelationInput,
    ActivityScalarFieldEnum,
    ActivityAggregateArgs,
    ActivityOmit,
    ActivityCreateManyInput
  >
  implements
    IBaseRepository<
      ActivityEntity,
      ActivityWhereInput,
      ActivityWhereUniqueInput,
      ActivityCreateInput,
      ActivityUpdateInput,
      ActivitySelect,
      never,
      ActivityOrderByWithRelationInput,
      ActivityScalarFieldEnum,
      ActivityAggregateArgs,
      ActivityOmit
    >
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'activity')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaActivity: PrismaActivity): ActivityEntity {
    return new ActivityEntity({
      id: prismaActivity.id,
      targetId: prismaActivity.targetId,
      targetType: prismaActivity.targetType as ActivityTargetType,
      type: prismaActivity.type as ActivityType,
      data: (prismaActivity.data as any) || {},
      createdAt: prismaActivity.createdAt,
      createdBy: prismaActivity.createdBy,
      updatedAt: prismaActivity.updatedAt,
      updatedBy: prismaActivity.updatedBy ?? undefined,
    })
  }

  protected toPrismaCreate(data: ActivityEntity): ActivityCreateInput {
    return {
      targetId: data.targetId,
      targetType: data.targetType,
      type: data.type,
      data: data.data,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    }
  }

  protected toPrismaCreateManyInput(data: ActivityEntity): ActivityCreateManyInput {
    return {
      targetId: data.targetId,
      targetType: data.targetType,
      type: data.type,
      data: data.data,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy,
    }
  }

  async findById(id: string, options?: ActivityBaseQueryOptions): Promise<ActivityEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: ActivityFindQueryOptions): Promise<ActivityEntity | null> {
    return this.findFirst(options)
  }
}
