import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskTag entity specific query options
 */

export interface TaskTagBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskTagSelect,
    Prisma.TaskTagInclude,
    Prisma.TaskTagOrderByWithRelationInput,
    Prisma.TaskTagOmit
  > {}

export interface TaskTagFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskTagWhereInput,
    Prisma.TaskTagSelect,
    Prisma.TaskTagInclude,
    Prisma.TaskTagOrderByWithRelationInput,
    Prisma.TaskTagOmit
  > {}

export interface TaskTagCountQueryOptions
  extends CountQueryOptions<Prisma.TaskTagWhereInput, Prisma.TaskTagCountAggregateInputType> {}

export interface TaskTagAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TaskTagWhereInput, Prisma.TaskTagAggregateArgs> {}

export interface TaskTagGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskTagWhereInput,
    Prisma.TaskTagScalarFieldEnum,
    Prisma.TaskTagAggregateArgs
  > {}

// Unique input types
export type TaskTagWhereInput = Prisma.TaskTagWhereInput
export type TaskTagWhereUniqueInput = Prisma.TaskTagWhereUniqueInput
export type TaskTagCreateInput = Prisma.TaskTagCreateInput
export type TaskTagCreateManyInput = Prisma.TaskTagCreateManyInput
export type TaskTagUpdateInput = Prisma.TaskTagUpdateInput
export type TaskTagSelect = Prisma.TaskTagSelect
export type TaskTagInclude = Prisma.TaskTagInclude
export type TaskTagOrderByWithRelationInput = Prisma.TaskTagOrderByWithRelationInput
export type TaskTagScalarFieldEnum = Prisma.TaskTagScalarFieldEnum
export type TaskTagAggregateArgs = Prisma.TaskTagAggregateArgs
export type TaskTagOmit = Prisma.TaskTagOmit
