import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * OrganizationStorage entity specific query options
 */

export interface OrganizationStorageBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.OrganizationStorageSelect,
    never,
    Prisma.OrganizationStorageOrderByWithRelationInput,
    Prisma.OrganizationStorageOmit
  > {}

export interface OrganizationStorageFindQueryOptions
  extends FindQueryOptions<
    Prisma.OrganizationStorageWhereInput,
    Prisma.OrganizationStorageSelect,
    never,
    Prisma.OrganizationStorageOrderByWithRelationInput,
    Prisma.OrganizationStorageOmit
  > {}

export interface OrganizationStorageCountQueryOptions
  extends CountQueryOptions<
    Prisma.OrganizationStorageWhereInput,
    Prisma.OrganizationStorageCountAggregateInputType
  > {}

export interface OrganizationStorageAggregateQueryOptions
  extends AggregateQueryOptions<
    Prisma.OrganizationStorageWhereInput,
    Prisma.OrganizationStorageAggregateArgs
  > {}

export interface OrganizationStorageGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.OrganizationStorageWhereInput,
    Prisma.OrganizationStorageScalarFieldEnum,
    Prisma.OrganizationStorageAggregateArgs
  > {}

// Unique input types
export type OrganizationStorageWhereInput = Prisma.OrganizationStorageWhereInput
export type OrganizationStorageWhereUniqueInput = Prisma.OrganizationStorageWhereUniqueInput
export type OrganizationStorageCreateInput = Prisma.OrganizationStorageCreateInput
export type OrganizationStorageCreateManyInput = Prisma.OrganizationStorageCreateManyInput
export type OrganizationStorageUpdateInput = Prisma.OrganizationStorageUpdateInput
export type OrganizationStorageSelect = Prisma.OrganizationStorageSelect
export type OrganizationStorageOrderByWithRelationInput =
  Prisma.OrganizationStorageOrderByWithRelationInput
export type OrganizationStorageScalarFieldEnum = Prisma.OrganizationStorageScalarFieldEnum
export type OrganizationStorageAggregateArgs = Prisma.OrganizationStorageAggregateArgs
export type OrganizationStorageOmit = Prisma.OrganizationStorageOmit
