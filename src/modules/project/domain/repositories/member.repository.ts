import {
  MemberBaseQueryOptions,
  MemberCountQueryOptions,
  MemberFindQueryOptions,
  MemberWhereUniqueInput,
} from '@/infrastructure/prisma/types/member-query-options.types'

import { MemberEntity } from '../entities/member.entity'

export interface IMemberRepository {
  // Basic CRUD operations với query options
  findById(memberId: string, options?: MemberBaseQueryOptions): Promise<MemberEntity | null>
  findOne(options?: MemberFindQueryOptions): Promise<MemberEntity | null>
  findMany(options?: MemberFindQueryOptions): Promise<MemberEntity[]>

  // Create/Update/Delete
  create(data: MemberEntity): Promise<MemberEntity>
  createMany(data: MemberEntity[]): Promise<MemberEntity[]>
  update(where: MemberWhereUniqueInput, data: Partial<MemberEntity>): Promise<MemberEntity>
  delete(where: MemberWhereUniqueInput): Promise<boolean>
  // Existence checks
  existsById(id: string): Promise<boolean>

  // Count operations
  count(options?: MemberCountQueryOptions): Promise<number>

  restore(where: MemberWhereUniqueInput, restoredBy: string): Promise<MemberEntity>
  removeMember(where: MemberWhereUniqueInput, removedBy: string): Promise<MemberEntity>
}
