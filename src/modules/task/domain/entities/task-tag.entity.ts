export class TaskTagEntity {
  public readonly taskId: string
  public readonly tagId: string

  constructor(props: { taskId: string; tagId: string }) {
    this.taskId = props.taskId
    this.tagId = props.tagId
  }

  static create(data: { taskId: string; tagId: string }): TaskTagEntity {
    return new TaskTagEntity(data)
  }
}
