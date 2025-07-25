import {
  ProjectViewBaseQueryOptions,
  ProjectViewCountQueryOptions,
  ProjectViewFindQueryOptions,
  ProjectViewWhereUniqueInput,
} from '@/infrastructure/prisma/types/project-view-query-options.types'

import { ProjectViewEntity } from '../entities/project-view.entity'

export interface IProjectViewRepository {
  // Basic CRUD operations with query options
  findById(id: string, options?: ProjectViewBaseQueryOptions): Promise<ProjectViewEntity | null>
  findOne(options?: ProjectViewFindQueryOptions): Promise<ProjectViewEntity | null>
  findMany(options?: ProjectViewFindQueryOptions): Promise<ProjectViewEntity[]>

  // Create/Update/Delete
  create(data: ProjectViewEntity): Promise<ProjectViewEntity>
  createMany(data: ProjectViewEntity[]): Promise<ProjectViewEntity[]>
  update(
    where: ProjectViewWhereUniqueInput,
    data: Partial<ProjectViewEntity>,
  ): Promise<ProjectViewEntity>
  delete(where: ProjectViewWhereUniqueInput): Promise<boolean>
  softDelete(where: ProjectViewWhereUniqueInput): Promise<boolean>
  // Count and aggregation operations
  count(options?: ProjectViewCountQueryOptions): Promise<number>
}
