import { TaskPriority } from '../../domain/enums/task-priority.enum'
import { TaskType } from '../../domain/enums/task-type.enum'

export class CreateTaskCommand {
  public readonly title: string
  public readonly projectId: string
  public readonly createdBy: string
  public readonly order: number
  public readonly desc?: string
  public readonly dueDate?: Date
  public readonly type?: TaskType
  public readonly priority?: TaskPriority
  public readonly taskStatusId?: string
  public readonly parentTaskId?: string
  public readonly taskPoint?: number
  public readonly customFields?: Record<string, any>
  public readonly assigneeIds?: string[]
  public readonly tagIds?: string[]
  public readonly cover?: string
  public readonly plannedStartDate?: Date
  public readonly plannedDueDate?: Date
  public readonly startDate?: Date

  constructor(props: {
    title: string
    projectId: string
    createdBy: string
    order: number
    desc?: string
    dueDate?: Date
    type?: TaskType
    priority?: TaskPriority
    taskStatusId?: string
    parentTaskId?: string
    taskPoint?: number
    customFields?: Record<string, any>
    assigneeIds?: string[]
    tagIds?: string[]
    cover?: string
    plannedStartDate?: Date
    plannedDueDate?: Date
    startDate?: Date
  }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskCommand {
  public readonly taskId: string
  public readonly updatedBy: string
  public readonly title?: string
  public readonly desc?: string
  public readonly dueDate?: Date
  public readonly order?: number
  public readonly type?: TaskType
  public readonly priority?: TaskPriority
  public readonly taskStatusId?: string
  public readonly parentTaskId?: string
  public readonly progress?: number
  public readonly done?: boolean
  public readonly taskPoint?: number
  public readonly customFields?: Record<string, any>
  public readonly cover?: string
  public readonly plannedStartDate?: Date
  public readonly plannedDueDate?: Date
  public readonly startDate?: Date

  constructor(props: {
    taskId: string
    updatedBy: string
    title?: string
    desc?: string
    dueDate?: Date
    order?: number
    type?: TaskType
    priority?: TaskPriority
    taskStatusId?: string
    parentTaskId?: string
    progress?: number
    done?: boolean
    taskPoint?: number
    customFields?: Record<string, any>
    cover?: string
    plannedStartDate?: Date
    plannedDueDate?: Date
    startDate?: Date
  }) {
    Object.assign(this, props)
  }
}

export class DeleteTaskCommand {
  public readonly taskId: string
  public readonly deletedBy: string

  constructor(props: { taskId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}

export class AssignTaskCommand {
  public readonly taskId: string
  public readonly userIds: string[]
  public readonly assignedBy: string

  constructor(props: { taskId: string; userIds: string[]; assignedBy: string }) {
    Object.assign(this, props)
  }
}

export class UnassignTaskCommand {
  public readonly taskId: string
  public readonly userIds: string[]
  public readonly unassignedBy: string

  constructor(props: { taskId: string; userIds: string[]; unassignedBy: string }) {
    Object.assign(this, props)
  }
}

export class AddTaskTagCommand {
  public readonly taskId: string
  public readonly tagIds: string[]
  public readonly addedBy: string

  constructor(props: { taskId: string; tagIds: string[]; addedBy: string }) {
    Object.assign(this, props)
  }
}

export class RemoveTaskTagCommand {
  public readonly taskId: string
  public readonly tagIds: string[]
  public readonly removedBy: string

  constructor(props: { taskId: string; tagIds: string[]; removedBy: string }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskProgressCommand {
  public readonly taskId: string
  public readonly progress: number
  public readonly updatedBy: string

  constructor(props: { taskId: string; progress: number; updatedBy: string }) {
    Object.assign(this, props)
  }
}
