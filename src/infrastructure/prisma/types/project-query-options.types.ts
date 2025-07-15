import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * User entity specific query options
 */

export interface ProjectBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.ProjectSelect,
    Prisma.ProjectInclude,
    Prisma.ProjectOrderByWithRelationInput
  > {}

export interface ProjectFindQueryOptions
  extends FindQueryOptions<
    Prisma.ProjectWhereInput,
    Prisma.ProjectSelect,
    Prisma.ProjectInclude,
    Prisma.ProjectOrderByWithRelationInput
  > {}

export interface ProjectCountQueryOptions
  extends CountQueryOptions<Prisma.ProjectWhereInput, Prisma.ProjectCountAggregateInputType> {}

export interface ProjectAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.ProjectWhereInput, Prisma.ProjectAggregateArgs> {}

export interface ProjectGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.ProjectWhereInput,
    Prisma.ProjectScalarFieldEnum,
    Prisma.ProjectAggregateArgs
  > {}

// Unique input types
export type ProjectWhereUniqueInput = Prisma.ProjectWhereUniqueInput
export type ProjectCreateInput = Prisma.ProjectCreateInput
export type ProjectUpdateInput = Prisma.ProjectUpdateInput
