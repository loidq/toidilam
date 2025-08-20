export class TaskChecklistEntity {
  public readonly id?: string
  public title: string
  public order: number
  public taskId: string
  public done: boolean
  public doneAt?: Date
  public createdAt?: Date
  public updatedAt?: Date

  constructor(props: {
    id?: string
    title: string
    order: number
    taskId: string
    done?: boolean
    doneAt?: Date
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = props.id
    this.title = props.title
    this.order = props.order
    this.taskId = props.taskId
    this.done = props.done || false
    this.doneAt = props.doneAt
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  static create(data: { title: string; order: number; taskId: string }): TaskChecklistEntity {
    return new TaskChecklistEntity(data)
  }

  markAsDone(): void {
    this.done = true
    this.doneAt = new Date()
  }

  markAsUndone(): void {
    this.done = false
    this.doneAt = undefined
  }

  updateTitle(title: string): void {
    this.title = title
  }

  updateOrder(order: number): void {
    this.order = order
  }
}
