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

export interface OrgBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.OrganizationSelect,
    Prisma.OrganizationInclude,
    Prisma.OrganizationOrderByWithRelationInput
  > {}

export interface OrgFindQueryOptions
  extends FindQueryOptions<
    Prisma.OrganizationWhereInput,
    Prisma.OrganizationSelect,
    Prisma.OrganizationInclude,
    Prisma.OrganizationOrderByWithRelationInput
  > {}

export interface OrgCountQueryOptions
  extends CountQueryOptions<
    Prisma.OrganizationWhereInput,
    Prisma.OrganizationCountAggregateInputType
  > {}

export interface OrgAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.OrganizationWhereInput, Prisma.OrganizationAggregateArgs> {}

export interface OrgGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.OrganizationWhereInput,
    Prisma.OrganizationScalarFieldEnum,
    Prisma.OrganizationAggregateArgs
  > {}

// Unique input types
export type OrgWhereUniqueInput = Prisma.OrganizationWhereUniqueInput
export type OrgCreateInput = Prisma.OrganizationCreateInput
export type OrgUpdateInput = Prisma.OrganizationUpdateInput
