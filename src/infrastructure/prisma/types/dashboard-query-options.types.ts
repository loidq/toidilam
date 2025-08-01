import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Dashboard entity specific query options
 */

export interface DashboardBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.DashboardSelect,
    Prisma.DashboardInclude,
    Prisma.DashboardOrderByWithRelationInput,
    Prisma.DashboardOmit
  > {}

export interface DashboardFindQueryOptions
  extends FindQueryOptions<
    Prisma.DashboardWhereInput,
    Prisma.DashboardSelect,
    Prisma.DashboardInclude,
    Prisma.DashboardOrderByWithRelationInput,
    Prisma.DashboardOmit
  > {}

export interface DashboardCountQueryOptions
  extends CountQueryOptions<Prisma.DashboardWhereInput, Prisma.DashboardCountAggregateInputType> {}

export interface DashboardAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.DashboardWhereInput, Prisma.DashboardAggregateArgs> {}

export interface DashboardGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.DashboardWhereInput,
    Prisma.DashboardScalarFieldEnum,
    Prisma.DashboardAggregateArgs
  > {}

// Unique input types
export type DashboardWhereInput = Prisma.DashboardWhereInput
export type DashboardWhereUniqueInput = Prisma.DashboardWhereUniqueInput
export type DashboardCreateInput = Prisma.DashboardCreateInput
export type DashboardCreateManyInput = Prisma.DashboardCreateManyInput
export type DashboardUpdateInput = Prisma.DashboardUpdateInput
export type DashboardSelect = Prisma.DashboardSelect
export type DashboardInclude = Prisma.DashboardInclude
export type DashboardOrderByWithRelationInput = Prisma.DashboardOrderByWithRelationInput
export type DashboardScalarFieldEnum = Prisma.DashboardScalarFieldEnum
export type DashboardAggregateArgs = Prisma.DashboardAggregateArgs
export type DashboardOmit = Prisma.DashboardOmit
