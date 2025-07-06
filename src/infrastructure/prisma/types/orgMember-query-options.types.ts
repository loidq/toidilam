import { Prisma } from '@prisma/client'
import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * OrganizationMember entity specific query options
 */

export interface OrgMemberBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.OrganizationMemberSelect,
    Prisma.OrganizationMemberInclude,
    Prisma.OrganizationMemberOrderByWithRelationInput
  > {}

export interface OrgMemberFindQueryOptions
  extends FindQueryOptions<
    Prisma.OrganizationMemberWhereInput,
    Prisma.OrganizationMemberSelect,
    Prisma.OrganizationMemberInclude,
    Prisma.OrganizationMemberOrderByWithRelationInput
  > {}

export interface OrgMemberCountQueryOptions
  extends CountQueryOptions<
    Prisma.OrganizationMemberWhereInput,
    Prisma.OrganizationMemberCountAggregateInputType
  > {}

export interface OrgMemberAggregateQueryOptions
  extends AggregateQueryOptions<
    Prisma.OrganizationMemberWhereInput,
    Prisma.OrganizationMemberAggregateArgs
  > {}

export interface OrgMemberGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.OrganizationMemberWhereInput,
    Prisma.OrganizationMemberScalarFieldEnum,
    Prisma.OrganizationMemberAggregateArgs
  > {}

// Unique input types
export type OrgMemberWhereUniqueInput = Prisma.OrganizationMemberWhereUniqueInput
export type OrgMemberCreateInput = Prisma.OrganizationMemberCreateInput
export type OrgMemberUpdateInput = Prisma.OrganizationMemberUpdateInput
