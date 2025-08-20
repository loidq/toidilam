import {
  OrgMemberBaseQueryOptions,
  OrgMemberCountQueryOptions,
  OrgMemberFindQueryOptions,
  OrgMemberWhereUniqueInput,
} from '@/infrastructure/prisma/types/org-member-query-options.types'

import { OrgMemberEntity } from '../entities/org-member.entity'

export interface IOrgMemberRepository {
  // Basic CRUD operations với query options
  findById(id: string, options?: OrgMemberBaseQueryOptions): Promise<OrgMemberEntity | null>
  findOne(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity | null>
  findMany(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity[]>

  // Create/Update/Delete
  create(data: OrgMemberEntity): Promise<OrgMemberEntity>
  update(where: OrgMemberWhereUniqueInput, data: Partial<OrgMemberEntity>): Promise<OrgMemberEntity>
  delete(where: OrgMemberWhereUniqueInput): Promise<boolean>
  removeMember(where: OrgMemberWhereUniqueInput, removedBy: string): Promise<OrgMemberEntity>
  // Existence checks
  existsById(orgMemberId: string): Promise<boolean>

  // Count operations
  count(options?: OrgMemberCountQueryOptions): Promise<number>

  restore(where: OrgMemberWhereUniqueInput, restoredBy: string): Promise<OrgMemberEntity>
}
