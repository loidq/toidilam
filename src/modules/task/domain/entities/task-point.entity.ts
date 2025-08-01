export class TaskPointEntity {
  public readonly id?: string
  public point: number
  public projectId: string
  public icon?: string

  constructor(props: { id?: string; point: number; projectId: string; icon?: string }) {
    this.id = props.id
    this.point = props.point
    this.projectId = props.projectId
    this.icon = props.icon
  }

  static create(data: { point: number; projectId: string; icon?: string }): TaskPointEntity {
    return new TaskPointEntity(data)
  }

  update(data: { point?: number; icon?: string }): void {
    if (data.point !== undefined) this.point = data.point
    if (data.icon !== undefined) this.icon = data.icon
  }
}
