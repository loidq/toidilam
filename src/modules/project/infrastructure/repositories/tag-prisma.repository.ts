import { Injectable } from '@nestjs/common'
import { Tag as PrismaTag } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { TagEntity } from '../../domain/entities/tag.entity'

@Injectable()
export class TagPrismaRepository
  extends BasePrismaRepository<TagEntity, any, any, any, any, any, never, any, any, any, any, any>
  implements IBaseRepository<TagEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'tag')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaTag: PrismaTag): TagEntity {
    return new TagEntity({
      id: prismaTag.id,
      name: prismaTag.name,
      color: prismaTag.color,
      projectId: prismaTag.projectId,
    })
  }

  protected toPrismaCreate(data: TagEntity): any {
    return {
      name: data.name,
      color: data.color,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: TagEntity): any {
    return {
      name: data.name,
      color: data.color,
      projectId: data.projectId,
    }
  }

  async findById(id: string, options?: any): Promise<TagEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<TagEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<TagEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }
}
