import {
  UserAggregateQueryOptions,
  UserBaseQueryOptions,
  UserCountQueryOptions,
  UserFindQueryOptions,
  UserGroupByQueryOptions,
} from '@/infrastructure/prisma/types/user-query-options.types'

import { UserEntity } from '../entities/user.entity'

export interface IUserRepository {
  // Basic CRUD operations với query options
  findById(id: string, options?: UserBaseQueryOptions): Promise<UserEntity | null>
  findByEmail(email: string, options?: UserBaseQueryOptions): Promise<UserEntity | null>
  findOne(options?: UserFindQueryOptions): Promise<UserEntity | null>
  findMany(options?: UserFindQueryOptions): Promise<UserEntity[]>

  // Create/Update/Delete
  createUser(user: UserEntity): Promise<UserEntity>
  updateUser(user: UserEntity): Promise<UserEntity>
  deleteUser(id: string): Promise<boolean>
  softDeleteUser(id: string): Promise<boolean>
  // Existence checks
  existsById(id: string): Promise<boolean>
  existsByEmail(email: string): Promise<boolean>

  // Count operations
  count(options?: UserCountQueryOptions): Promise<number>

  // Advanced operations
  findUsersWithPagination(
    page: number,
    limit: number,
    options?: UserFindQueryOptions,
  ): Promise<{ users: UserEntity[]; total: number }>

  // Aggregate operations
   
  aggregate(options?: UserAggregateQueryOptions): Promise<any>
   
  groupBy(options: UserGroupByQueryOptions): Promise<any>
}
