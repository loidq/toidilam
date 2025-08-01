import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Vision entity specific query options
 */

export interface VisionBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.VisionSelect,
    Prisma.VisionInclude,
    Prisma.VisionOrderByWithRelationInput,
    Prisma.VisionOmit
  > {}

export interface VisionFindQueryOptions
  extends FindQueryOptions<
    Prisma.VisionWhereInput,
    Prisma.VisionSelect,
    Prisma.VisionInclude,
    Prisma.VisionOrderByWithRelationInput,
    Prisma.VisionOmit
  > {}

export interface VisionCountQueryOptions
  extends CountQueryOptions<Prisma.VisionWhereInput, Prisma.VisionCountAggregateInputType> {}

export interface VisionAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.VisionWhereInput, Prisma.VisionAggregateArgs> {}

export interface VisionGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.VisionWhereInput,
    Prisma.VisionScalarFieldEnum,
    Prisma.VisionAggregateArgs
  > {}

// Unique input types
export type VisionWhereInput = Prisma.VisionWhereInput
export type VisionWhereUniqueInput = Prisma.VisionWhereUniqueInput
export type VisionCreateInput = Prisma.VisionCreateInput
export type VisionCreateManyInput = Prisma.VisionCreateManyInput
export type VisionUpdateInput = Prisma.VisionUpdateInput
export type VisionSelect = Prisma.VisionSelect
export type VisionInclude = Prisma.VisionInclude
export type VisionOrderByWithRelationInput = Prisma.VisionOrderByWithRelationInput
export type VisionScalarFieldEnum = Prisma.VisionScalarFieldEnum
export type VisionAggregateArgs = Prisma.VisionAggregateArgs
export type VisionOmit = Prisma.VisionOmit
