export class CreateTaskPointCommand {
  public readonly point: number
  public readonly projectId: string
  public readonly icon?: string
  public readonly createdBy: string

  constructor(props: { point: number; projectId: string; icon?: string; createdBy: string }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskPointCommand {
  public readonly taskPointId: string
  public readonly point?: number
  public readonly icon?: string
  public readonly updatedBy: string

  constructor(props: { taskPointId: string; point?: number; icon?: string; updatedBy: string }) {
    Object.assign(this, props)
  }
}

export class DeleteTaskPointCommand {
  public readonly taskPointId: string
  public readonly deletedBy: string

  constructor(props: { taskPointId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}
