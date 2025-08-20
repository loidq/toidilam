import { deepCleanObject } from '@/shared/utils/deep-clean.util'
import { PrismaService } from '../prisma.service'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from '../types/query-options.types'
import { IBaseRepository } from './base-repository.interface'
/**
 * Abstract base repository implementation using Prisma
 */
export abstract class BasePrismaRepository<
  TEntity,
  TWhereInput,
  TWhereUniqueInput,
  TCreateInput,
  TUpdateInput,
  TSelect,
  TInclude,
  TOrderBy,
  TScalarFieldEnum,
  TAggregateArgs,
  TOmit = {},
  TCreateManyInput = any,
> implements
    IBaseRepository<
      TEntity,
      TWhereInput,
      TWhereUniqueInput,
      TCreateInput,
      TUpdateInput,
      TSelect,
      TInclude,
      TOrderBy,
      TScalarFieldEnum,
      TAggregateArgs,
      TOmit
    >
{
  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly modelName: string,
  ) {}

  protected get model() {
    return (this.prismaService as any)[this.modelName]
  }

  // Abstract mapper methods - phải implement ở child class
  protected abstract toDomain(prismaEntity: any): TEntity
  protected abstract toPrismaCreate(entity: TEntity): TCreateInput
  protected toPrismaCreateManyInput?(entity: TEntity): TCreateManyInput
  protected toPrismaUpdate(data: Partial<TEntity>): TUpdateInput {
    return data as unknown as TUpdateInput
  }

  async findUnique(
    where: TWhereUniqueInput,
    options?: BaseQueryOptions<TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity | null> {
    const result = await this.model.findUnique({
      where,
      ...this.buildQueryOptions(options),
    })

    return result ? this.toDomain(result) : null
  }
  async findUniqueRaw(
    where: TWhereUniqueInput,
    options?: BaseQueryOptions<TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<any | null> {
    return await this.model.findUnique({
      where,
      ...this.buildQueryOptions(options),
    })
  }

  async findFirst(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity | null> {
    const result = await this.model.findFirst({
      ...this.buildQueryOptions(options),
      where: options?.where,
    })

    return result ? this.toDomain(result) : null
  }

  async findFirstRaw(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<any | null> {
    return await this.model.findFirst({
      ...this.buildQueryOptions(options),
      where: options?.where,
    })
  }

  async findMany(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity[]> {
    const results = await this.model.findMany({
      ...this.buildQueryOptions(options),
      where: options?.where,
    })
    return results.map((result: any) => this.toDomain(result))
  }
  async findManyRaw(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<any[]> {
    return await this.model.findMany({
      ...this.buildQueryOptions(options),
      where: options?.where,
    })
  }

  async create(data: TEntity): Promise<TEntity> {
    const prismaData = this.toPrismaCreate(data)
    const result = await this.model.create({ data: deepCleanObject(prismaData) })
    return this.toDomain(result)
  }

  async createRaw(data: TEntity): Promise<any> {
    const prismaData = this.toPrismaCreate(data)
    const result = await this.model.create({
      data: deepCleanObject(prismaData),
    })
    return result
  }

  async createMany(datas: TEntity[]): Promise<TEntity[]> {
    return await this.model.createMany({
      data: datas.map(item => deepCleanObject(this.toPrismaCreateManyInput!(item))),
      skipDuplicates: true,
    })
  }

  async update(where: TWhereUniqueInput, data: Partial<TEntity>): Promise<TEntity> {
    const prismaData = this.toPrismaUpdate(data)
    const result = await this.model.update({ where, data: deepCleanObject(prismaData) })
    return this.toDomain(result)
  }
  async updateRaw(where: TWhereUniqueInput, data: Partial<TEntity>): Promise<any> {
    const prismaData = this.toPrismaUpdate(data)
    const result = await this.model.update({
      where,
      data: deepCleanObject(prismaData),
    })
    return result
  }
  async updateMany(where: TWhereInput, data: Partial<TEntity>): Promise<{ count: number }> {
    const prismaData = this.toPrismaUpdate(data)
    const result = await this.model.updateMany({
      where,
      data: deepCleanObject(prismaData),
    })
    return result
  }

  async delete(where: TWhereUniqueInput): Promise<boolean> {
    try {
      await this.model.delete({ where })
      return true
    } catch {
      return false
    }
  }

  async softDelete(where: TWhereUniqueInput): Promise<boolean> {
    try {
      await this.model.update({
        where,
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        },
      })
      return true
    } catch {
      return false
    }
  }

  async exists(where: TWhereInput): Promise<boolean> {
    const result = await this.model.findFirst({
      where,
      select: { id: true },
    })
    return !!result
  }

  async count(options?: CountQueryOptions<TWhereInput>): Promise<number> {
    return await this.model.count({
      where: options?.where,
      select: options?.select,
      cursor: options?.cursor,
      orderBy: options?.orderBy,
      skip: options?.skip,
      take: options?.take,
    })
  }

  async aggregate(options?: AggregateQueryOptions<TWhereInput, TAggregateArgs>): Promise<any> {
    return await this.model.aggregate({
      where: options?.where,
      orderBy: options?.orderBy,
      cursor: options?.cursor,
      take: options?.take,
      skip: options?.skip,
      _count: options?._count,
      _avg: options?._avg,
      _sum: options?._sum,
      _min: options?._min,
      _max: options?._max,
    })
  }

  async groupBy(
    options: GroupByQueryOptions<TWhereInput, TScalarFieldEnum, TAggregateArgs>,
  ): Promise<any> {
    return await this.model.groupBy({
      where: options.where,
      orderBy: options.orderBy,
      by: options.by,
      having: options.having,
      take: options.take,
      skip: options.skip,
      _count: options._count,
      _avg: options._avg,
      _sum: options._sum,
      _min: options._min,
      _max: options._max,
    })
  }

  // Helper method để build query options
  private buildQueryOptions(options?: BaseQueryOptions<TSelect, TInclude, TOrderBy, TOmit>) {
    if (!options) return {}

    return {
      select: options.select,
      include: options.include,
      orderBy: options.orderBy,
      skip: options.skip,
      take: options.take,
      cursor: options.cursor,
      distinct: options.distinct,
      omit: options.omit,
    }
  }
}
