import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Timer entity specific query options
 */

export interface TimerBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TimerSelect,
    Prisma.TimerInclude,
    Prisma.TimerOrderByWithRelationInput,
    Prisma.TimerOmit
  > {}

export interface TimerFindQueryOptions
  extends FindQueryOptions<
    Prisma.TimerWhereInput,
    Prisma.TimerSelect,
    Prisma.TimerInclude,
    Prisma.TimerOrderByWithRelationInput,
    Prisma.TimerOmit
  > {}

export interface TimerCountQueryOptions
  extends CountQueryOptions<Prisma.TimerWhereInput, Prisma.TimerCountAggregateInputType> {}

export interface TimerAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TimerWhereInput, Prisma.TimerAggregateArgs> {}

export interface TimerGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TimerWhereInput,
    Prisma.TimerScalarFieldEnum,
    Prisma.TimerAggregateArgs
  > {}

// Unique input types
export type TimerWhereInput = Prisma.TimerWhereInput
export type TimerWhereUniqueInput = Prisma.TimerWhereUniqueInput
export type TimerCreateInput = Prisma.TimerCreateInput
export type TimerCreateManyInput = Prisma.TimerCreateManyInput
export type TimerUpdateInput = Prisma.TimerUpdateInput
export type TimerSelect = Prisma.TimerSelect
export type TimerInclude = Prisma.TimerInclude
export type TimerOrderByWithRelationInput = Prisma.TimerOrderByWithRelationInput
export type TimerScalarFieldEnum = Prisma.TimerScalarFieldEnum
export type TimerAggregateArgs = Prisma.TimerAggregateArgs
export type TimerOmit = Prisma.TimerOmit
