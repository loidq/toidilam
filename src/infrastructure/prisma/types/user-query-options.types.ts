import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * User entity specific query options
 */

export interface UserBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.UserSelect,
    Prisma.UserInclude,
    Prisma.UserOrderByWithRelationInput
  > {}

export interface UserFindQueryOptions
  extends FindQueryOptions<
    Prisma.UserWhereInput,
    Prisma.UserSelect,
    Prisma.UserInclude,
    Prisma.UserOrderByWithRelationInput
  > {}

export interface UserCountQueryOptions
  extends CountQueryOptions<Prisma.UserWhereInput, Prisma.UserCountAggregateInputType> {}

export interface UserAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.UserWhereInput, Prisma.UserAggregateArgs> {}

export interface UserGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.UserWhereInput,
    Prisma.UserScalarFieldEnum,
    Prisma.UserAggregateArgs
  > {}

// Unique input types
export type UserWhereUniqueInput = Prisma.UserWhereUniqueInput
export type UserCreateInput = Prisma.UserCreateInput
export type UserUpdateInput = Prisma.UserUpdateInput
