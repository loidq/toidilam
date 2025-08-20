import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Task entity specific query options
 */

export interface TaskBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskSelect,
    Prisma.TaskInclude,
    Prisma.TaskOrderByWithRelationInput,
    Prisma.TaskOmit
  > {}

export interface TaskFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskWhereInput,
    Prisma.TaskSelect,
    Prisma.TaskInclude,
    Prisma.TaskOrderByWithRelationInput,
    Prisma.TaskOmit
  > {}

export interface TaskCountQueryOptions
  extends CountQueryOptions<Prisma.TaskWhereInput, Prisma.TaskCountAggregateInputType> {}

export interface TaskAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TaskWhereInput, Prisma.TaskAggregateArgs> {}

export interface TaskGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskWhereInput,
    Prisma.TaskScalarFieldEnum,
    Prisma.TaskAggregateArgs
  > {}

// Unique input types
export type TaskWhereInput = Prisma.TaskWhereInput
export type TaskWhereUniqueInput = Prisma.TaskWhereUniqueInput
export type TaskCreateInput = Prisma.TaskCreateInput
export type TaskCreateManyInput = Prisma.TaskCreateManyInput
export type TaskUpdateInput = Prisma.TaskUpdateInput
export type TaskSelect = Prisma.TaskSelect
export type TaskInclude = Prisma.TaskInclude
export type TaskOrderByWithRelationInput = Prisma.TaskOrderByWithRelationInput
export type TaskScalarFieldEnum = Prisma.TaskScalarFieldEnum
export type TaskAggregateArgs = Prisma.TaskAggregateArgs
export type TaskOmit = Prisma.TaskOmit
