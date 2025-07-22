import { Prisma } from '@prisma/client'

import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * ProjectView entity specific query options
 */

export interface ProjectViewBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.ProjectViewSelect,
    Prisma.ProjectViewInclude,
    Prisma.ProjectViewOrderByWithRelationInput
  > {}

export interface ProjectViewFindQueryOptions
  extends FindQueryOptions<
    Prisma.ProjectViewWhereInput,
    Prisma.ProjectViewSelect,
    Prisma.ProjectViewInclude,
    Prisma.ProjectViewOrderByWithRelationInput
  > {}

export interface ProjectViewCountQueryOptions
  extends CountQueryOptions<
    Prisma.ProjectViewWhereInput,
    Prisma.ProjectViewCountAggregateInputType
  > {}

export interface ProjectViewAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.ProjectViewWhereInput, Prisma.ProjectViewAggregateArgs> {}

export interface ProjectViewGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.ProjectViewWhereInput,
    Prisma.ProjectViewScalarFieldEnum,
    Prisma.ProjectViewAggregateArgs
  > {}

// Unique input types
export type ProjectViewWhereUniqueInput = Prisma.ProjectViewWhereUniqueInput
export type ProjectViewCreateInput = Prisma.ProjectViewCreateInput
export type ProjectViewUpdateInput = Prisma.ProjectViewUpdateInput
