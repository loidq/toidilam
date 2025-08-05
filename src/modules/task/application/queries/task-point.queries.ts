export class GetTaskPointsQuery {
  public readonly projectId?: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId?: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class GetTaskPointByIdQuery {
  public readonly taskPointId: string

  constructor(taskPointId: string) {
    this.taskPointId = taskPointId
  }
}
