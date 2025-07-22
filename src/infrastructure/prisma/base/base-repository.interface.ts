import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from '../types/query-options.types'

/**
 * Base repository interface với generic types
 */
export interface IBaseRepository<
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
  TOmit,
> {
  findUnique(
    where: TWhereUniqueInput,
    options?: BaseQueryOptions<TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity | null>

  findFirst(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity | null>

  findMany(
    options?: FindQueryOptions<TWhereInput, TSelect, TInclude, TOrderBy, TOmit>,
  ): Promise<TEntity[]>

  create(data: TEntity): Promise<TEntity>
  update(where: TWhereUniqueInput, data: Partial<TEntity>): Promise<TEntity>
  delete(where: TWhereUniqueInput): Promise<boolean>
  softDelete(where: TWhereUniqueInput): Promise<boolean>

  // Utility methods
  exists(where: TWhereInput): Promise<boolean>
  count(options?: CountQueryOptions<TWhereInput>): Promise<number>

  // Advanced operations
  aggregate(options?: AggregateQueryOptions<TWhereInput, TAggregateArgs>): Promise<any>
  groupBy(options: GroupByQueryOptions<TWhereInput, TScalarFieldEnum, TAggregateArgs>): Promise<any>
}
