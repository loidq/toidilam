export class GetTaskStatusesQuery {
  public readonly projectId?: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId?: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class GetTaskStatusByIdQuery {
  public readonly statusId: string

  constructor(statusId: string) {
    this.statusId = statusId
  }
}

export class GetTaskStatusesByProjectQuery {
  public readonly projectId: string

  constructor(projectId: string) {
    this.projectId = projectId
  }
}
