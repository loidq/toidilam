import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskChecklist entity specific query options
 */

export interface TaskChecklistBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskChecklistSelect,
    Prisma.TaskChecklistInclude,
    Prisma.TaskChecklistOrderByWithRelationInput,
    Prisma.TaskChecklistOmit
  > {}

export interface TaskChecklistFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskChecklistWhereInput,
    Prisma.TaskChecklistSelect,
    Prisma.TaskChecklistInclude,
    Prisma.TaskChecklistOrderByWithRelationInput,
    Prisma.TaskChecklistOmit
  > {}

export interface TaskChecklistCountQueryOptions
  extends CountQueryOptions<
    Prisma.TaskChecklistWhereInput,
    Prisma.TaskChecklistCountAggregateInputType
  > {}

export interface TaskChecklistAggregateQueryOptions
  extends AggregateQueryOptions<
    Prisma.TaskChecklistWhereInput,
    Prisma.TaskChecklistAggregateArgs
  > {}

export interface TaskChecklistGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskChecklistWhereInput,
    Prisma.TaskChecklistScalarFieldEnum,
    Prisma.TaskChecklistAggregateArgs
  > {}

// Unique input types
export type TaskChecklistWhereInput = Prisma.TaskChecklistWhereInput
export type TaskChecklistWhereUniqueInput = Prisma.TaskChecklistWhereUniqueInput
export type TaskChecklistCreateInput = Prisma.TaskChecklistCreateInput
export type TaskChecklistCreateManyInput = Prisma.TaskChecklistCreateManyInput
export type TaskChecklistUpdateInput = Prisma.TaskChecklistUpdateInput
export type TaskChecklistSelect = Prisma.TaskChecklistSelect
export type TaskChecklistInclude = Prisma.TaskChecklistInclude
export type TaskChecklistOrderByWithRelationInput = Prisma.TaskChecklistOrderByWithRelationInput
export type TaskChecklistScalarFieldEnum = Prisma.TaskChecklistScalarFieldEnum
export type TaskChecklistAggregateArgs = Prisma.TaskChecklistAggregateArgs
export type TaskChecklistOmit = Prisma.TaskChecklistOmit
