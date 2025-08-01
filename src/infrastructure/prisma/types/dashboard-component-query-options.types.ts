import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * DashboardComponent entity specific query options
 */

export interface DashboardComponentBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.DashboardComponentSelect,
    Prisma.DashboardComponentInclude,
    Prisma.DashboardComponentOrderByWithRelationInput,
    Prisma.DashboardComponentOmit
  > {}

export interface DashboardComponentFindQueryOptions
  extends FindQueryOptions<
    Prisma.DashboardComponentWhereInput,
    Prisma.DashboardComponentSelect,
    Prisma.DashboardComponentInclude,
    Prisma.DashboardComponentOrderByWithRelationInput,
    Prisma.DashboardComponentOmit
  > {}

export interface DashboardComponentCountQueryOptions
  extends CountQueryOptions<
    Prisma.DashboardComponentWhereInput,
    Prisma.DashboardComponentCountAggregateInputType
  > {}

export interface DashboardComponentAggregateQueryOptions
  extends AggregateQueryOptions<
    Prisma.DashboardComponentWhereInput,
    Prisma.DashboardComponentAggregateArgs
  > {}

export interface DashboardComponentGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.DashboardComponentWhereInput,
    Prisma.DashboardComponentScalarFieldEnum,
    Prisma.DashboardComponentAggregateArgs
  > {}

// Unique input types
export type DashboardComponentWhereInput = Prisma.DashboardComponentWhereInput
export type DashboardComponentWhereUniqueInput = Prisma.DashboardComponentWhereUniqueInput
export type DashboardComponentCreateInput = Prisma.DashboardComponentCreateInput
export type DashboardComponentCreateManyInput = Prisma.DashboardComponentCreateManyInput
export type DashboardComponentUpdateInput = Prisma.DashboardComponentUpdateInput
export type DashboardComponentSelect = Prisma.DashboardComponentSelect
export type DashboardComponentInclude = Prisma.DashboardComponentInclude
export type DashboardComponentOrderByWithRelationInput =
  Prisma.DashboardComponentOrderByWithRelationInput
export type DashboardComponentScalarFieldEnum = Prisma.DashboardComponentScalarFieldEnum
export type DashboardComponentAggregateArgs = Prisma.DashboardComponentAggregateArgs
export type DashboardComponentOmit = Prisma.DashboardComponentOmit
