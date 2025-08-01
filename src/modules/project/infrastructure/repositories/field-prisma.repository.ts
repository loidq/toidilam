import { Injectable } from '@nestjs/common'
import { Field as PrismaField } from '@prisma/client'

import { BasePrismaRepository, IBaseRepository } from '@/infrastructure/prisma/base'
import { PrismaService } from '@/infrastructure/prisma/prisma.service'

import { FieldEntity } from '../../domain/entities/field.entity'

@Injectable()
export class FieldPrismaRepository
  extends BasePrismaRepository<FieldEntity, any, any, any, any, any, never, any, any, any, any, any>
  implements IBaseRepository<FieldEntity, any, any, any, any, any, never, any, any, any, any>
{
  constructor(prismaService: PrismaService) {
    super(prismaService, 'field')
  }

  // Implement abstract mapper methods
  protected toDomain(prismaField: PrismaField): FieldEntity {
    return new FieldEntity({
      id: prismaField.id,
      name: prismaField.name,
      type: prismaField.type as any,
      icon: prismaField.icon || undefined,
      hidden: prismaField.hidden,
      width: prismaField.width,
      order: prismaField.order,
      desc: prismaField.desc || undefined,
      data: prismaField.data ? (prismaField.data as any) : undefined,
      config: prismaField.config ? (prismaField.config as any) : undefined,
      projectId: prismaField.projectId,
    })
  }

  protected toPrismaCreate(data: FieldEntity): any {
    return {
      name: data.name,
      type: data.type,
      icon: data.icon,
      hidden: data.hidden,
      width: data.width,
      order: data.order,
      desc: data.desc,
      data: data.data,
      config: data.config,
      project: {
        connect: { id: data.projectId },
      },
    }
  }

  protected toPrismaCreateManyInput(data: FieldEntity): any {
    return {
      name: data.name,
      type: data.type,
      icon: data.icon,
      hidden: data.hidden,
      width: data.width,
      order: data.order,
      desc: data.desc,
      data: data.data,
      config: data.config,
      projectId: data.projectId,
    }
  }

  async findById(id: string, options?: any): Promise<FieldEntity | null> {
    return this.findUnique({ id }, options)
  }

  async findOne(options?: any): Promise<FieldEntity | null> {
    return this.findFirst(options)
  }

  async findByProject(projectId: string, options?: any): Promise<FieldEntity[]> {
    return this.findMany({ where: { projectId }, ...options })
  }
}
