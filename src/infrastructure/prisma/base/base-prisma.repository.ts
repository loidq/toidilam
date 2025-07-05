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
  protected abstract toPrismaUpdate(entity: TEntity): TUpdateInput

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

  async findFirst(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity | null> {
    const result = await this.model.findFirst({
      ...this.buildQueryOptions(options),
      where: options?.where,
    })

    return result ? this.toDomain(result) : null
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

  async create(data: TCreateInput): Promise<TEntity> {
    const result = await this.model.create({ data })
    return this.toDomain(result)
  }

  async update(where: TWhereUniqueInput, data: TUpdateInput): Promise<TEntity> {
    const result = await this.model.update({ where, data })
    return this.toDomain(result)
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
