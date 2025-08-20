import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskStatus entity specific query options
 */

export interface TaskStatusBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskStatusSelect,
    Prisma.TaskStatusInclude,
    Prisma.TaskStatusOrderByWithRelationInput,
    Prisma.TaskStatusOmit
  > {}

export interface TaskStatusFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskStatusWhereInput,
    Prisma.TaskStatusSelect,
    Prisma.TaskStatusInclude,
    Prisma.TaskStatusOrderByWithRelationInput,
    Prisma.TaskStatusOmit
  > {}

export interface TaskStatusCountQueryOptions
  extends CountQueryOptions<
    Prisma.TaskStatusWhereInput,
    Prisma.TaskStatusCountAggregateInputType
  > {}

export interface TaskStatusAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TaskStatusWhereInput, Prisma.TaskStatusAggregateArgs> {}

export interface TaskStatusGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskStatusWhereInput,
    Prisma.TaskStatusScalarFieldEnum,
    Prisma.TaskStatusAggregateArgs
  > {}

// Unique input types
export type TaskStatusWhereInput = Prisma.TaskStatusWhereInput
export type TaskStatusWhereUniqueInput = Prisma.TaskStatusWhereUniqueInput
export type TaskStatusCreateInput = Prisma.TaskStatusCreateInput
export type TaskStatusCreateManyInput = Prisma.TaskStatusCreateManyInput
export type TaskStatusUpdateInput = Prisma.TaskStatusUpdateInput
export type TaskStatusSelect = Prisma.TaskStatusSelect
export type TaskStatusInclude = Prisma.TaskStatusInclude
export type TaskStatusOrderByWithRelationInput = Prisma.TaskStatusOrderByWithRelationInput
export type TaskStatusScalarFieldEnum = Prisma.TaskStatusScalarFieldEnum
export type TaskStatusAggregateArgs = Prisma.TaskStatusAggregateArgs
export type TaskStatusOmit = Prisma.TaskStatusOmit
