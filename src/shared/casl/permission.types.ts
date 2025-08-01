import { Ability } from '@casl/ability'

// Define các action cho phép
export enum Action {
  MANAGE = 'manage', // wildcard - có thể làm mọi thứ
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  ASSIGN = 'assign', // Gán task, thành viên
  ARCHIVE = 'archive', // Archive project
  RESTORE = 'restore', // Restore project
  LEAVE = 'leave', // Rời project hoặc org
  INVITE = 'invite', // Mời người khác vào project hoặc org
}

// Define các subject từ Prisma schema
export enum Subject {
  ALL = 'all', // Wildcard - áp dụng cho mọi resource
  USER = 'User',
  ORGANIZATION = 'Organization',
  ORGANIZATION_MEMBER = 'OrganizationMember',
  MEMBER = 'Member',
  PROJECT = 'Project',
  PROJECT_VIEW = 'ProjectView',
  TASK = 'Task',
  TASK_STATUS = 'TaskStatus',
  TASK_TAG = 'TaskTag',
  COMMENT = 'Comment',
  VISION = 'Vision',
  FILE_STORAGE = 'FileStorage',
  DASHBOARD = 'Dashboard',
  TIMER = 'Timer',
  FAVORITE = 'Favorite',
  TASK_AUTOMATION = 'TaskAutomation',
  SCHEDULER = 'Scheduler',
  APPLICATION = 'Application',
}

// Define interface cho các đối tượng
export interface IAbilitySubject {
  id: string
  [key: string]: any
}

// Type định nghĩa cho AppAbility
export type AppAbility = Ability<[Action, Subject | IAbilitySubject]>

// Định nghĩa condition cho các rule
export interface IRuleCondition {
  [key: string]: any
}

// Custom rule definition
export interface ICustomRule {
  action: Action | Action[]
  subject: Subject | Subject[]
  conditions?: IRuleCondition
  fields?: string[]
  inverted?: boolean
}

// Permission data để lưu trữ quyền
export interface IPermissionData {
  organizationId?: string
  projectId?: string
  orgRole?: string
  projectRole?: string
  userId: string
}
