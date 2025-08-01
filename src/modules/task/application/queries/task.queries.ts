import { TaskPriority } from '../../domain/enums/task-priority.enum'
import { TaskType } from '../../domain/enums/task-type.enum'

export class GetTaskByIdQuery {
  constructor(public readonly taskId: string) {}
}

export class GetTasksQuery {
  public readonly projectId?: string
  public readonly assigneeId?: string
  public readonly statusId?: string
  public readonly parentTaskId?: string
  public readonly priority?: TaskPriority
  public readonly type?: TaskType
  public readonly done?: boolean
  public readonly search?: string
  public readonly dueDateFrom?: Date
  public readonly dueDateTo?: Date
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    projectId?: string
    assigneeId?: string
    statusId?: string
    parentTaskId?: string
    priority?: TaskPriority
    type?: TaskType
    done?: boolean
    search?: string
    dueDateFrom?: Date
    dueDateTo?: Date
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}

export class GetTasksByProjectQuery {
  public readonly projectId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class GetTasksByAssigneeQuery {
  public readonly assigneeId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { assigneeId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class GetSubTasksQuery {
  public readonly parentTaskId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { parentTaskId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class SearchTasksQuery {
  public readonly searchTerm: string
  public readonly projectId?: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { searchTerm: string; projectId?: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}
