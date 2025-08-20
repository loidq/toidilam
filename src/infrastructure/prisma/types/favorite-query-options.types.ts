import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Favorite entity specific query options
 */

export interface FavoriteBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.FavoriteSelect,
    never,
    Prisma.FavoriteOrderByWithRelationInput,
    Prisma.FavoriteOmit
  > {}

export interface FavoriteFindQueryOptions
  extends FindQueryOptions<
    Prisma.FavoriteWhereInput,
    Prisma.FavoriteSelect,
    never,
    Prisma.FavoriteOrderByWithRelationInput,
    Prisma.FavoriteOmit
  > {}

export interface FavoriteCountQueryOptions
  extends CountQueryOptions<Prisma.FavoriteWhereInput, Prisma.FavoriteCountAggregateInputType> {}

export interface FavoriteAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.FavoriteWhereInput, Prisma.FavoriteAggregateArgs> {}

export interface FavoriteGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.FavoriteWhereInput,
    Prisma.FavoriteScalarFieldEnum,
    Prisma.FavoriteAggregateArgs
  > {}

// Unique input types
export type FavoriteWhereInput = Prisma.FavoriteWhereInput
export type FavoriteWhereUniqueInput = Prisma.FavoriteWhereUniqueInput
export type FavoriteCreateInput = Prisma.FavoriteCreateInput
export type FavoriteCreateManyInput = Prisma.FavoriteCreateManyInput
export type FavoriteUpdateInput = Prisma.FavoriteUpdateInput
export type FavoriteSelect = Prisma.FavoriteSelect
export type FavoriteOrderByWithRelationInput = Prisma.FavoriteOrderByWithRelationInput
export type FavoriteScalarFieldEnum = Prisma.FavoriteScalarFieldEnum
export type FavoriteAggregateArgs = Prisma.FavoriteAggregateArgs
export type FavoriteOmit = Prisma.FavoriteOmit
