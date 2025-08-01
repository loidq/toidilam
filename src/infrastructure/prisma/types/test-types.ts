import { ActivityBaseQueryOptions } from './activity-query-options.types'
import { FavoriteBaseQueryOptions } from './favorite-query-options.types'
import { TaskAssigneeBaseQueryOptions } from './task-assignee-query-options.types'
import { TaskChecklistBaseQueryOptions } from './task-checklist-query-options.types'
import { TaskStatusBaseQueryOptions } from './task-status-query-options.types'

// Test compilation
const testTypes = {
  taskStatus: {} as TaskStatusBaseQueryOptions,
  taskAssignee: {} as TaskAssigneeBaseQueryOptions,
  taskChecklist: {} as TaskChecklistBaseQueryOptions,
  favorite: {} as FavoriteBaseQueryOptions,
  activity: {} as ActivityBaseQueryOptions,
}

export { testTypes }
