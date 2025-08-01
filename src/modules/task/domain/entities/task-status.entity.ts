import { StatusType } from '../enums/status-type.enum'
import { TaskEntity } from './task.entity'

export class TaskStatusEntity {
  public readonly id?: string
  public name: string
  public color: string
  public order: number
  public projectId: string
  public type: StatusType
  public createdAt?: Date
  public updatedAt?: Date

  // Relations
  public tasks: TaskEntity[]

  constructor(props: {
    id?: string
    name: string
    color: string
    order: number
    projectId: string
    type?: StatusType
    createdAt?: Date
    updatedAt?: Date
    tasks?: TaskEntity[]
  }) {
    this.id = props.id
    this.name = props.name
    this.color = props.color
    this.order = props.order
    this.projectId = props.projectId
    this.type = props.type || StatusType.TODO
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.tasks = props.tasks || []
  }

  static create(data: {
    name: string
    color: string
    order: number
    projectId: string
    type?: StatusType
  }): TaskStatusEntity {
    return new TaskStatusEntity(data)
  }

  update(data: { name?: string; color?: string; order?: number; type?: StatusType }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.color !== undefined) this.color = data.color
    if (data.order !== undefined) this.order = data.order
    if (data.type !== undefined) this.type = data.type
  }
}
