import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskAssignee entity specific query options
 */

export interface TaskAssigneeBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskAssigneeSelect,
    Prisma.TaskAssigneeInclude,
    Prisma.TaskAssigneeOrderByWithRelationInput,
    Prisma.TaskAssigneeOmit
  > {}

export interface TaskAssigneeFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskAssigneeWhereInput,
    Prisma.TaskAssigneeSelect,
    Prisma.TaskAssigneeInclude,
    Prisma.TaskAssigneeOrderByWithRelationInput,
    Prisma.TaskAssigneeOmit
  > {}

export interface TaskAssigneeCountQueryOptions
  extends CountQueryOptions<
    Prisma.TaskAssigneeWhereInput,
    Prisma.TaskAssigneeCountAggregateInputType
  > {}

export interface TaskAssigneeAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TaskAssigneeWhereInput, Prisma.TaskAssigneeAggregateArgs> {}

export interface TaskAssigneeGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskAssigneeWhereInput,
    Prisma.TaskAssigneeScalarFieldEnum,
    Prisma.TaskAssigneeAggregateArgs
  > {}

// Unique input types
export type TaskAssigneeWhereInput = Prisma.TaskAssigneeWhereInput
export type TaskAssigneeWhereUniqueInput = Prisma.TaskAssigneeWhereUniqueInput
export type TaskAssigneeCreateInput = Prisma.TaskAssigneeCreateInput
export type TaskAssigneeCreateManyInput = Prisma.TaskAssigneeCreateManyInput
export type TaskAssigneeUpdateInput = Prisma.TaskAssigneeUpdateInput
export type TaskAssigneeSelect = Prisma.TaskAssigneeSelect
export type TaskAssigneeInclude = Prisma.TaskAssigneeInclude
export type TaskAssigneeOrderByWithRelationInput = Prisma.TaskAssigneeOrderByWithRelationInput
export type TaskAssigneeScalarFieldEnum = Prisma.TaskAssigneeScalarFieldEnum
export type TaskAssigneeAggregateArgs = Prisma.TaskAssigneeAggregateArgs
export type TaskAssigneeOmit = Prisma.TaskAssigneeOmit
