import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * FileStorage entity specific query options
 */

export interface FileStorageBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.FileStorageSelect,
    Prisma.FileStorageInclude,
    Prisma.FileStorageOrderByWithRelationInput,
    Prisma.FileStorageOmit
  > {}

export interface FileStorageFindQueryOptions
  extends FindQueryOptions<
    Prisma.FileStorageWhereInput,
    Prisma.FileStorageSelect,
    Prisma.FileStorageInclude,
    Prisma.FileStorageOrderByWithRelationInput,
    Prisma.FileStorageOmit
  > {}

export interface FileStorageCountQueryOptions
  extends CountQueryOptions<
    Prisma.FileStorageWhereInput,
    Prisma.FileStorageCountAggregateInputType
  > {}

export interface FileStorageAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.FileStorageWhereInput, Prisma.FileStorageAggregateArgs> {}

export interface FileStorageGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.FileStorageWhereInput,
    Prisma.FileStorageScalarFieldEnum,
    Prisma.FileStorageAggregateArgs
  > {}

// Unique input types
export type FileStorageWhereInput = Prisma.FileStorageWhereInput
export type FileStorageWhereUniqueInput = Prisma.FileStorageWhereUniqueInput
export type FileStorageCreateInput = Prisma.FileStorageCreateInput
export type FileStorageCreateManyInput = Prisma.FileStorageCreateManyInput
export type FileStorageUpdateInput = Prisma.FileStorageUpdateInput
export type FileStorageSelect = Prisma.FileStorageSelect
export type FileStorageInclude = Prisma.FileStorageInclude
export type FileStorageOrderByWithRelationInput = Prisma.FileStorageOrderByWithRelationInput
export type FileStorageScalarFieldEnum = Prisma.FileStorageScalarFieldEnum
export type FileStorageAggregateArgs = Prisma.FileStorageAggregateArgs
export type FileStorageOmit = Prisma.FileStorageOmit
