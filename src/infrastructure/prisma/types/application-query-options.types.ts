import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Application entity specific query options
 */

export interface ApplicationBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.ApplicationSelect,
    Prisma.ApplicationInclude,
    Prisma.ApplicationOrderByWithRelationInput,
    Prisma.ApplicationOmit
  > {}

export interface ApplicationFindQueryOptions
  extends FindQueryOptions<
    Prisma.ApplicationWhereInput,
    Prisma.ApplicationSelect,
    Prisma.ApplicationInclude,
    Prisma.ApplicationOrderByWithRelationInput,
    Prisma.ApplicationOmit
  > {}

export interface ApplicationCountQueryOptions
  extends CountQueryOptions<
    Prisma.ApplicationWhereInput,
    Prisma.ApplicationCountAggregateInputType
  > {}

export interface ApplicationAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.ApplicationWhereInput, Prisma.ApplicationAggregateArgs> {}

export interface ApplicationGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.ApplicationWhereInput,
    Prisma.ApplicationScalarFieldEnum,
    Prisma.ApplicationAggregateArgs
  > {}

// Unique input types
export type ApplicationWhereInput = Prisma.ApplicationWhereInput
export type ApplicationWhereUniqueInput = Prisma.ApplicationWhereUniqueInput
export type ApplicationCreateInput = Prisma.ApplicationCreateInput
export type ApplicationCreateManyInput = Prisma.ApplicationCreateManyInput
export type ApplicationUpdateInput = Prisma.ApplicationUpdateInput
export type ApplicationSelect = Prisma.ApplicationSelect
export type ApplicationInclude = Prisma.ApplicationInclude
export type ApplicationOrderByWithRelationInput = Prisma.ApplicationOrderByWithRelationInput
export type ApplicationScalarFieldEnum = Prisma.ApplicationScalarFieldEnum
export type ApplicationAggregateArgs = Prisma.ApplicationAggregateArgs
export type ApplicationOmit = Prisma.ApplicationOmit
