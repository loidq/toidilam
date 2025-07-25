import { Prisma } from '@prisma/client'

import {
  AggregateQueryOptions,
  BaseQueryOptions,
  CountQueryOptions,
  FindQueryOptions,
  GroupByQueryOptions,
} from './query-options.types'

/**
 * Member entity specific query options
 */

export interface MemberBaseQueryOptions
  extends BaseQueryOptions<
    Prisma.MemberSelect,
    Prisma.MemberInclude,
    Prisma.MemberOrderByWithRelationInput
  > {}

export interface MemberFindQueryOptions
  extends FindQueryOptions<
    Prisma.MemberWhereInput,
    Prisma.MemberSelect,
    Prisma.MemberInclude,
    Prisma.MemberOrderByWithRelationInput
  > {}

export interface MemberCountQueryOptions
  extends CountQueryOptions<Prisma.MemberWhereInput, Prisma.MemberCountAggregateInputType> {}

export interface MemberAggregateQueryOptions
  extends AggregateQueryOptions<Prisma.MemberWhereInput, Prisma.MemberAggregateArgs> {}

export interface MemberGroupByQueryOptions
  extends GroupByQueryOptions<
    Prisma.MemberWhereInput,
    Prisma.MemberScalarFieldEnum,
    Prisma.MemberAggregateArgs
  > {}

// Unique input types
export type MemberWhereUniqueInput = Prisma.MemberWhereUniqueInput
export type MemberCreateInput = Prisma.MemberCreateInput
export type MemberUpdateInput = Prisma.MemberUpdateInput

// Custom member query options for specific use cases
export interface MemberProjectQueryOptions extends MemberBaseQueryOptions {
  projectId: string
  includeRemoved?: boolean
}

export interface MemberUserQueryOptions extends MemberBaseQueryOptions {
  userId: string
  includeRemoved?: boolean
}

export interface MemberRoleQueryOptions extends MemberBaseQueryOptions {
  roles: string[]
  projectId?: string
}

// Member with user information query options
export interface MemberWithUserQueryOptions extends MemberBaseQueryOptions {
  includeUser?: boolean
  userSelect?: Prisma.UserSelect
}

// Member statistics query options
export interface MemberStatsQueryOptions {
  projectId?: string
  organizationId?: string
  dateFrom?: Date
  dateTo?: Date
  groupBy?: 'role' | 'project' | 'date'
}
