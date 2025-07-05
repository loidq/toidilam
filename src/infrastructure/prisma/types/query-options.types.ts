/**
 * Base Prisma Query Options Types
 * Tái sử dụng cho tất cả entities
 */

// Base query options cho find operations
export interface BaseQueryOptions<TSelect = any, TInclude = any, TOrderBy = any, TOmit = any> {
  select?: TSelect
  include?: TInclude
  orderBy?: TOrderBy | TOrderBy[]
  skip?: number
  take?: number
  cursor?: any
  distinct?: any[]
  omit?: TOmit
}

// Count operation options
export interface CountQueryOptions<TWhere = any, TSelect = any> {
  where?: TWhere
  select?: TSelect
  cursor?: any
  orderBy?: any
  skip?: number
  take?: number
}

// Aggregate operation options
export interface AggregateQueryOptions<TWhere = any, TAgg = any> {
  where?: TWhere
  orderBy?: any
  cursor?: any
  take?: number
  skip?: number
  _count?: TAgg | boolean
  _avg?: TAgg
  _sum?: TAgg
  _min?: TAgg
  _max?: TAgg
}

// GroupBy operation options
export interface GroupByQueryOptions<TWhere = any, TBy = any, TAgg = any> {
  where?: TWhere
  orderBy?: any
  by: TBy[]
  having?: any
  take?: number
  skip?: number
  _count?: TAgg | boolean
  _avg?: TAgg
  _sum?: TAgg
  _min?: TAgg
  _max?: TAgg
}

// Find options kết hợp where với base options
export interface FindQueryOptions<
  TWhere = any,
  TSelect = any,
  TInclude = any,
  TOrderBy = any,
  TOmit = any,
> extends BaseQueryOptions<TSelect, TInclude, TOrderBy, TOmit> {
  where?: TWhere
}

// Pagination result type
export interface PaginationResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Pagination options
export interface PaginationOptions {
  page?: number
  limit?: number
}
