import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Field entity specific query options
 */

export interface FieldBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.FieldSelect,
    Prisma.FieldInclude,
    Prisma.FieldOrderByWithRelationInput,
    Prisma.FieldOmit
  > {}

export interface FieldFindQueryOptions
  extends FindQueryOptions<
    Prisma.FieldWhereInput,
    Prisma.FieldSelect,
    Prisma.FieldInclude,
    Prisma.FieldOrderByWithRelationInput,
    Prisma.FieldOmit
  > {}

export interface FieldCountQueryOptions
  extends CountQueryOptions<Prisma.FieldWhereInput, Prisma.FieldCountAggregateInputType> {}

export interface FieldAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.FieldWhereInput, Prisma.FieldAggregateArgs> {}

export interface FieldGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.FieldWhereInput,
    Prisma.FieldScalarFieldEnum,
    Prisma.FieldAggregateArgs
  > {}

// Unique input types
export type FieldWhereInput = Prisma.FieldWhereInput
export type FieldWhereUniqueInput = Prisma.FieldWhereUniqueInput
export type FieldCreateInput = Prisma.FieldCreateInput
export type FieldCreateManyInput = Prisma.FieldCreateManyInput
export type FieldUpdateInput = Prisma.FieldUpdateInput
export type FieldSelect = Prisma.FieldSelect
export type FieldInclude = Prisma.FieldInclude
export type FieldOrderByWithRelationInput = Prisma.FieldOrderByWithRelationInput
export type FieldScalarFieldEnum = Prisma.FieldScalarFieldEnum
export type FieldAggregateArgs = Prisma.FieldAggregateArgs
export type FieldOmit = Prisma.FieldOmit
