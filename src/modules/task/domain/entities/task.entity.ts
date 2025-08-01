import { FileStorageEntity } from '../../../storage/domain/entities/file-storage.entity'
import { TaskPriority } from '../enums/task-priority.enum'
import { TaskType } from '../enums/task-type.enum'
import { CommentEntity } from './comment.entity'
import { TaskAssigneeEntity } from './task-assignee.entity'
import { TaskChecklistEntity } from './task-checklist.entity'
import { TaskStatusEntity } from './task-status.entity'
import { TaskTagEntity } from './task-tag.entity'
import { TimerEntity } from './timer.entity'
export interface ITaskCustomFields {
  [key: string]: any
}

export class TaskEntity {
  public readonly id?: string
  public title: string
  public desc?: string
  public dueDate?: Date
  public order: number
  public type: TaskType
  public checklistDone?: number
  public checklistTodos?: number
  public cover?: string
  public plannedStartDate?: Date
  public plannedDueDate?: Date
  public startDate?: Date
  public projectId: string
  public priority?: TaskPriority
  public taskStatusId?: string
  public parentTaskId?: string
  public progress?: number
  public done: boolean
  public taskPoint?: number
  public customFields: ITaskCustomFields
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  // Relations
  public taskChecklists: TaskChecklistEntity[]
  public taskAssignees: TaskAssigneeEntity[]
  public taskTags: TaskTagEntity[]
  public taskStatus?: TaskStatusEntity
  public parentTask?: TaskEntity
  public subTasks: TaskEntity[]
  public comments: CommentEntity[]
  public timers: TimerEntity[]
  public fileStorages: FileStorageEntity[]

  constructor(props: {
    id?: string
    title: string
    desc?: string
    dueDate?: Date
    order: number
    type?: TaskType
    checklistDone?: number
    checklistTodos?: number
    cover?: string
    plannedStartDate?: Date
    plannedDueDate?: Date
    startDate?: Date
    projectId: string
    priority?: TaskPriority
    taskStatusId?: string
    parentTaskId?: string
    progress?: number
    done?: boolean
    taskPoint?: number
    customFields?: ITaskCustomFields
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
    taskChecklists?: TaskChecklistEntity[]
    taskAssignees?: TaskAssigneeEntity[]
    taskTags?: TaskTagEntity[]
    taskStatus?: TaskStatusEntity
    parentTask?: TaskEntity
    subTasks?: TaskEntity[]
    comments?: CommentEntity[]
    timers?: TimerEntity[]
    fileStorages?: FileStorageEntity[]
  }) {
    this.id = props.id
    this.title = props.title
    this.desc = props.desc
    this.dueDate = props.dueDate
    this.order = props.order
    this.type = props.type || TaskType.TASK
    this.checklistDone = props.checklistDone
    this.checklistTodos = props.checklistTodos
    this.cover = props.cover
    this.plannedStartDate = props.plannedStartDate
    this.plannedDueDate = props.plannedDueDate
    this.startDate = props.startDate
    this.projectId = props.projectId
    this.priority = props.priority
    this.taskStatusId = props.taskStatusId
    this.parentTaskId = props.parentTaskId
    this.progress = props.progress
    this.done = props.done || false
    this.taskPoint = props.taskPoint
    this.customFields = props.customFields || {}
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.taskChecklists = props.taskChecklists || []
    this.taskAssignees = props.taskAssignees || []
    this.taskTags = props.taskTags || []
    this.taskStatus = props.taskStatus
    this.parentTask = props.parentTask
    this.subTasks = props.subTasks || []
    this.comments = props.comments || []
    this.timers = props.timers || []
    this.fileStorages = props.fileStorages || []
  }

  static create(data: {
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
    customFields?: ITaskCustomFields
    cover?: string
    plannedStartDate?: Date
    plannedDueDate?: Date
    startDate?: Date
  }): TaskEntity {
    return new TaskEntity({
      ...data,
      type: data.type || TaskType.TASK,
    })
  }

  update(data: {
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
    customFields?: ITaskCustomFields
    updatedBy?: string
    cover?: string
    plannedStartDate?: Date
    plannedDueDate?: Date
    startDate?: Date
  }): void {
    if (data.title !== undefined) this.title = data.title
    if (data.desc !== undefined) this.desc = data.desc
    if (data.dueDate !== undefined) this.dueDate = data.dueDate
    if (data.order !== undefined) this.order = data.order
    if (data.type !== undefined) this.type = data.type
    if (data.priority !== undefined) this.priority = data.priority
    if (data.taskStatusId !== undefined) this.taskStatusId = data.taskStatusId
    if (data.parentTaskId !== undefined) this.parentTaskId = data.parentTaskId
    if (data.progress !== undefined) this.progress = data.progress
    if (data.done !== undefined) this.done = data.done
    if (data.taskPoint !== undefined) this.taskPoint = data.taskPoint
    if (data.customFields !== undefined)
      this.customFields = { ...this.customFields, ...data.customFields }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
    if (data.cover !== undefined) this.cover = data.cover
    if (data.plannedStartDate !== undefined) this.plannedStartDate = data.plannedStartDate
    if (data.plannedDueDate !== undefined) this.plannedDueDate = data.plannedDueDate
    if (data.startDate !== undefined) this.startDate = data.startDate
  }
}
