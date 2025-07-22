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
  // Existence checks
  existsById(id: string): Promise<boolean>

  // Count operations
  count(options?: OrgMemberCountQueryOptions): Promise<number>
}
