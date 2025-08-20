import {
  ProjectBaseQueryOptions,
  ProjectCountQueryOptions,
  ProjectFindQueryOptions,
  ProjectWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-query-options.types'

import { ProjectEntity } from '../entities/project.entity'

export interface IProjectRepository {
  // Basic CRUD operations với query options
  findById(id: string, options?: ProjectBaseQueryOptions): Promise<ProjectEntity | null>
  findOne(options?: ProjectFindQueryOptions): Promise<ProjectEntity | null>
  findMany(options?: ProjectFindQueryOptions): Promise<ProjectEntity[]>

  // Create/Update/Delete
  create(data: ProjectEntity): Promise<ProjectEntity>
  createMany(data: ProjectEntity[]): Promise<ProjectEntity[]>
  update(where: ProjectWhereUniqueInput, data: Partial<ProjectEntity>): Promise<ProjectEntity>
  delete(where: ProjectWhereUniqueInput): Promise<boolean>
  softDelete(where: ProjectWhereUniqueInput): Promise<boolean>
  archive(
    id: string,
    data: {
      updatedBy: string
      isArchived: boolean
    },
  ): Promise<boolean>

  // Existence checks
  existsById(id: string): Promise<boolean>

  // Count operations
  count(options?: ProjectCountQueryOptions): Promise<number>

  // Search operations
  search(
    searchTerm: string,
    organizationId: string,
    options?: ProjectFindQueryOptions,
  ): Promise<ProjectEntity[]>
}
