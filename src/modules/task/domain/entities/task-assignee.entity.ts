export class TaskAssigneeEntity {
  public readonly taskId: string
  public readonly userId: string
  public readonly assignedAt: Date
  public readonly user?: any

  constructor(props: { taskId: string; userId: string; assignedAt?: Date; user?: any }) {
    this.taskId = props.taskId
    this.userId = props.userId
    this.assignedAt = props.assignedAt || new Date()
    this.user = props.user
  }

  static create(data: { taskId: string; userId: string }): TaskAssigneeEntity {
    return new TaskAssigneeEntity(data)
  }
}
