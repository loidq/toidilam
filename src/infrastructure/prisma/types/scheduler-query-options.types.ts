import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Scheduler entity specific query options
 */

export interface SchedulerBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.SchedulerSelect,
    Prisma.SchedulerInclude,
    Prisma.SchedulerOrderByWithRelationInput,
    Prisma.SchedulerOmit
  > {}

export interface SchedulerFindQueryOptions
  extends FindQueryOptions<
    Prisma.SchedulerWhereInput,
    Prisma.SchedulerSelect,
    Prisma.SchedulerInclude,
    Prisma.SchedulerOrderByWithRelationInput,
    Prisma.SchedulerOmit
  > {}

export interface SchedulerCountQueryOptions
  extends CountQueryOptions<Prisma.SchedulerWhereInput, Prisma.SchedulerCountAggregateInputType> {}

export interface SchedulerAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.SchedulerWhereInput, Prisma.SchedulerAggregateArgs> {}

export interface SchedulerGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.SchedulerWhereInput,
    Prisma.SchedulerScalarFieldEnum,
    Prisma.SchedulerAggregateArgs
  > {}

// Unique input types
export type SchedulerWhereInput = Prisma.SchedulerWhereInput
export type SchedulerWhereUniqueInput = Prisma.SchedulerWhereUniqueInput
export type SchedulerCreateInput = Prisma.SchedulerCreateInput
export type SchedulerCreateManyInput = Prisma.SchedulerCreateManyInput
export type SchedulerUpdateInput = Prisma.SchedulerUpdateInput
export type SchedulerSelect = Prisma.SchedulerSelect
export type SchedulerInclude = Prisma.SchedulerInclude
export type SchedulerOrderByWithRelationInput = Prisma.SchedulerOrderByWithRelationInput
export type SchedulerScalarFieldEnum = Prisma.SchedulerScalarFieldEnum
export type SchedulerAggregateArgs = Prisma.SchedulerAggregateArgs
export type SchedulerOmit = Prisma.SchedulerOmit
