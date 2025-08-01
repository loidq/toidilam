import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Activity entity specific query options
 */

export interface ActivityBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.ActivitySelect,
    never,
    Prisma.ActivityOrderByWithRelationInput,
    Prisma.ActivityOmit
  > {}

export interface ActivityFindQueryOptions
  extends FindQueryOptions<
    Prisma.ActivityWhereInput,
    Prisma.ActivitySelect,
    never,
    Prisma.ActivityOrderByWithRelationInput,
    Prisma.ActivityOmit
  > {}

export interface ActivityCountQueryOptions
  extends CountQueryOptions<Prisma.ActivityWhereInput, Prisma.ActivityCountAggregateInputType> {}

export interface ActivityAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.ActivityWhereInput, Prisma.ActivityAggregateArgs> {}

export interface ActivityGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.ActivityWhereInput,
    Prisma.ActivityScalarFieldEnum,
    Prisma.ActivityAggregateArgs
  > {}

// Unique input types
export type ActivityWhereInput = Prisma.ActivityWhereInput
export type ActivityWhereUniqueInput = Prisma.ActivityWhereUniqueInput
export type ActivityCreateInput = Prisma.ActivityCreateInput
export type ActivityCreateManyInput = Prisma.ActivityCreateManyInput
export type ActivityUpdateInput = Prisma.ActivityUpdateInput
export type ActivitySelect = Prisma.ActivitySelect
export type ActivityOrderByWithRelationInput = Prisma.ActivityOrderByWithRelationInput
export type ActivityScalarFieldEnum = Prisma.ActivityScalarFieldEnum
export type ActivityAggregateArgs = Prisma.ActivityAggregateArgs
export type ActivityOmit = Prisma.ActivityOmit
