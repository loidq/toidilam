import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskPoint entity specific query options
 */

export interface TaskPointBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskPointSelect,
    Prisma.TaskPointInclude,
    Prisma.TaskPointOrderByWithRelationInput,
    Prisma.TaskPointOmit
  > {}

export interface TaskPointFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskPointWhereInput,
    Prisma.TaskPointSelect,
    Prisma.TaskPointInclude,
    Prisma.TaskPointOrderByWithRelationInput,
    Prisma.TaskPointOmit
  > {}

export interface TaskPointCountQueryOptions
  extends CountQueryOptions<Prisma.TaskPointWhereInput, Prisma.TaskPointCountAggregateInputType> {}

export interface TaskPointAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TaskPointWhereInput, Prisma.TaskPointAggregateArgs> {}

export interface TaskPointGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskPointWhereInput,
    Prisma.TaskPointScalarFieldEnum,
    Prisma.TaskPointAggregateArgs
  > {}

// Unique input types
export type TaskPointWhereInput = Prisma.TaskPointWhereInput
export type TaskPointWhereUniqueInput = Prisma.TaskPointWhereUniqueInput
export type TaskPointCreateInput = Prisma.TaskPointCreateInput
export type TaskPointCreateManyInput = Prisma.TaskPointCreateManyInput
export type TaskPointUpdateInput = Prisma.TaskPointUpdateInput
export type TaskPointSelect = Prisma.TaskPointSelect
export type TaskPointInclude = Prisma.TaskPointInclude
export type TaskPointOrderByWithRelationInput = Prisma.TaskPointOrderByWithRelationInput
export type TaskPointScalarFieldEnum = Prisma.TaskPointScalarFieldEnum
export type TaskPointAggregateArgs = Prisma.TaskPointAggregateArgs
export type TaskPointOmit = Prisma.TaskPointOmit
