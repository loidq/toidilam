import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Tag entity specific query options
 */

export interface TagBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.TagSelect,
    Prisma.TagInclude,
    Prisma.TagOrderByWithRelationInput,
    Prisma.TagOmit
  > {}

export interface TagFindQueryOptions
  extends FindQueryOptions<
    Prisma.TagWhereInput,
    Prisma.TagSelect,
    Prisma.TagInclude,
    Prisma.TagOrderByWithRelationInput,
    Prisma.TagOmit
  > {}

export interface TagCountQueryOptions
  extends CountQueryOptions<Prisma.TagWhereInput, Prisma.TagCountAggregateInputType> {}

export interface TagAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.TagWhereInput, Prisma.TagAggregateArgs> {}

export interface TagGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.TagWhereInput,
    Prisma.TagScalarFieldEnum,
    Prisma.TagAggregateArgs
  > {}

// Unique input types
export type TagWhereInput = Prisma.TagWhereInput
export type TagWhereUniqueInput = Prisma.TagWhereUniqueInput
export type TagCreateInput = Prisma.TagCreateInput
export type TagCreateManyInput = Prisma.TagCreateManyInput
export type TagUpdateInput = Prisma.TagUpdateInput
export type TagSelect = Prisma.TagSelect
export type TagInclude = Prisma.TagInclude
export type TagOrderByWithRelationInput = Prisma.TagOrderByWithRelationInput
export type TagScalarFieldEnum = Prisma.TagScalarFieldEnum
export type TagAggregateArgs = Prisma.TagAggregateArgs
export type TagOmit = Prisma.TagOmit
