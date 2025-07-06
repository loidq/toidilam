import {
  OrgMemberBaseQueryOptions,
  OrgMemberCountQueryOptions,
  OrgMemberFindQueryOptions,
} from '@/infrastructure/prisma/types/orgMember-query-options.types'

import { OrgMemberEntity } from '../entities/orgMember.entity'

export interface IOrgMemberRepository {
  // Basic CRUD operations với query options
  findById(id: string, options?: OrgMemberBaseQueryOptions): Promise<OrgMemberEntity | null>
  findOne(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity | null>
  findMany(options?: OrgMemberFindQueryOptions): Promise<OrgMemberEntity[]>

  // Create/Update/Delete
  createOrgMember(orgMember: OrgMemberEntity): Promise<OrgMemberEntity>
  updateOrgMember(orgMember: OrgMemberEntity): Promise<OrgMemberEntity>
  deleteOrgMember(id: string): Promise<boolean>
  // Existence checks
  existsById(id: string): Promise<boolean>

  // Count operations
  count(options?: OrgMemberCountQueryOptions): Promise<number>
}
