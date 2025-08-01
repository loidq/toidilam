import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * TaskAutomation entity specific query options
 */

export interface TaskAutomationBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TaskAutomationSelect,
    Prisma.TaskAutomationInclude,
    Prisma.TaskAutomationOrderByWithRelationInput,
    Prisma.TaskAutomationOmit
  > {}

export interface TaskAutomationFindQueryOptions
  extends FindQueryOptions<
    Prisma.TaskAutomationWhereInput,
    Prisma.TaskAutomationSelect,
    Prisma.TaskAutomationInclude,
    Prisma.TaskAutomationOrderByWithRelationInput,
    Prisma.TaskAutomationOmit
  > {}

export interface TaskAutomationCountQueryOptions
  extends CountQueryOptions<
    Prisma.TaskAutomationWhereInput,
    Prisma.TaskAutomationCountAggregateInputType
  > {}

export interface TaskAutomationAggregateQueryOptions
  extends AggregateQueryOptions<
    Prisma.TaskAutomationWhereInput,
    Prisma.TaskAutomationAggregateArgs
  > {}

export interface TaskAutomationGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TaskAutomationWhereInput,
    Prisma.TaskAutomationScalarFieldEnum,
    Prisma.TaskAutomationAggregateArgs
  > {}

// Unique input types
export type TaskAutomationWhereInput = Prisma.TaskAutomationWhereInput
export type TaskAutomationWhereUniqueInput = Prisma.TaskAutomationWhereUniqueInput
export type TaskAutomationCreateInput = Prisma.TaskAutomationCreateInput
export type TaskAutomationCreateManyInput = Prisma.TaskAutomationCreateManyInput
export type TaskAutomationUpdateInput = Prisma.TaskAutomationUpdateInput
export type TaskAutomationSelect = Prisma.TaskAutomationSelect
export type TaskAutomationInclude = Prisma.TaskAutomationInclude
export type TaskAutomationOrderByWithRelationInput = Prisma.TaskAutomationOrderByWithRelationInput
export type TaskAutomationScalarFieldEnum = Prisma.TaskAutomationScalarFieldEnum
export type TaskAutomationAggregateArgs = Prisma.TaskAutomationAggregateArgs
export type TaskAutomationOmit = Prisma.TaskAutomationOmit
