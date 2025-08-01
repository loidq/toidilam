import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Comment entity specific query options
 */

export interface CommentBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.CommentSelect,
    Prisma.CommentInclude,
    Prisma.CommentOrderByWithRelationInput,
    Prisma.CommentOmit
  > {}

export interface CommentFindQueryOptions
  extends FindQueryOptions<
    Prisma.CommentWhereInput,
    Prisma.CommentSelect,
    Prisma.CommentInclude,
    Prisma.CommentOrderByWithRelationInput,
    Prisma.CommentOmit
  > {}

export interface CommentCountQueryOptions
  extends CountQueryOptions<Prisma.CommentWhereInput, Prisma.CommentCountAggregateInputType> {}

export interface CommentAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.CommentWhereInput, Prisma.CommentAggregateArgs> {}

export interface CommentGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.CommentWhereInput,
    Prisma.CommentScalarFieldEnum,
    Prisma.CommentAggregateArgs
  > {}

// Unique input types
export type CommentWhereInput = Prisma.CommentWhereInput
export type CommentWhereUniqueInput = Prisma.CommentWhereUniqueInput
export type CommentCreateInput = Prisma.CommentCreateInput
export type CommentCreateManyInput = Prisma.CommentCreateManyInput
export type CommentUpdateInput = Prisma.CommentUpdateInput
export type CommentSelect = Prisma.CommentSelect
export type CommentInclude = Prisma.CommentInclude
export type CommentOrderByWithRelationInput = Prisma.CommentOrderByWithRelationInput
export type CommentScalarFieldEnum = Prisma.CommentScalarFieldEnum
export type CommentAggregateArgs = Prisma.CommentAggregateArgs
export type CommentOmit = Prisma.CommentOmit
