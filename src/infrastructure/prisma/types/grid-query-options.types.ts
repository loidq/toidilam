import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Grid entity specific query options
 */

export interface GridBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.GridSelect,
    Prisma.GridInclude,
    Prisma.GridOrderByWithRelationInput,
    Prisma.GridOmit
  > {}

export interface GridFindQueryOptions
  extends FindQueryOptions<
    Prisma.GridWhereInput,
    Prisma.GridSelect,
    Prisma.GridInclude,
    Prisma.GridOrderByWithRelationInput,
    Prisma.GridOmit
  > {}

export interface GridCountQueryOptions
  extends CountQueryOptions<Prisma.GridWhereInput, Prisma.GridCountAggregateInputType> {}

export interface GridAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.GridWhereInput, Prisma.GridAggregateArgs> {}

export interface GridGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.GridWhereInput,
    Prisma.GridScalarFieldEnum,
    Prisma.GridAggregateArgs
  > {}

// Unique input types
export type GridWhereInput = Prisma.GridWhereInput
export type GridWhereUniqueInput = Prisma.GridWhereUniqueInput
export type GridCreateInput = Prisma.GridCreateInput
export type GridCreateManyInput = Prisma.GridCreateManyInput
export type GridUpdateInput = Prisma.GridUpdateInput
export type GridSelect = Prisma.GridSelect
export type GridInclude = Prisma.GridInclude
export type GridOrderByWithRelationInput = Prisma.GridOrderByWithRelationInput
export type GridScalarFieldEnum = Prisma.GridScalarFieldEnum
export type GridAggregateArgs = Prisma.GridAggregateArgs
export type GridOmit = Prisma.GridOmit
