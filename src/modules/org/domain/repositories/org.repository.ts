import {
  OrgBaseQueryOptions,
  OrgCountQueryOptions,
  OrgFindQueryOptions,
} from '@/infrastructure/prisma/types/org-query-options.types'

import { OrgEntity } from '../entities/org.entity'

export interface IOrgRepository {
  // Basic CRUD operations với query options
  findById(id: string, options?: OrgBaseQueryOptions): Promise<OrgEntity | null>
  findBySlug(slug: string, options?: OrgBaseQueryOptions): Promise<OrgEntity | null>
  findOne(options?: OrgFindQueryOptions): Promise<OrgEntity | null>
  findMany(options?: OrgFindQueryOptions): Promise<OrgEntity[]>

  // Create/Update/Delete
  createOrg(org: OrgEntity): Promise<OrgEntity>
  updateOrg(org: OrgEntity): Promise<OrgEntity>
  deleteOrg(id: string): Promise<boolean>
  // Existence checks
  existsById(id: string): Promise<boolean>
  existsBySlug(slug: string): Promise<boolean>

  // Count operations
  count(options?: OrgCountQueryOptions): Promise<number>
}
