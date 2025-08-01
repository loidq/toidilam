import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Stat entity specific query options
 */

export interface StatBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.StatSelect,
    Prisma.StatInclude,
    Prisma.StatOrderByWithRelationInput,
    Prisma.StatOmit
  > {}

export interface StatFindQueryOptions
  extends FindQueryOptions<
    Prisma.StatWhereInput,
    Prisma.StatSelect,
    Prisma.StatInclude,
    Prisma.StatOrderByWithRelationInput,
    Prisma.StatOmit
  > {}

export interface StatCountQueryOptions
  extends CountQueryOptions<Prisma.StatWhereInput, Prisma.StatCountAggregateInputType> {}

export interface StatAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.StatWhereInput, Prisma.StatAggregateArgs> {}

export interface StatGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.StatWhereInput,
    Prisma.StatScalarFieldEnum,
    Prisma.StatAggregateArgs
  > {}

// Unique input types
export type StatWhereInput = Prisma.StatWhereInput
export type StatWhereUniqueInput = Prisma.StatWhereUniqueInput
export type StatCreateInput = Prisma.StatCreateInput
export type StatCreateManyInput = Prisma.StatCreateManyInput
export type StatUpdateInput = Prisma.StatUpdateInput
export type StatSelect = Prisma.StatSelect
export type StatInclude = Prisma.StatInclude
export type StatOrderByWithRelationInput = Prisma.StatOrderByWithRelationInput
export type StatScalarFieldEnum = Prisma.StatScalarFieldEnum
export type StatAggregateArgs = Prisma.StatAggregateArgs
export type StatOmit = Prisma.StatOmit
