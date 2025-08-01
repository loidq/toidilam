export class CreateTaskChecklistCommand {
  public readonly taskId: string
  public readonly title: string
  public readonly order: number
  public readonly createdBy: string

  constructor(props: { taskId: string; title: string; order: number; createdBy: string }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskChecklistCommand {
  public readonly checklistId: string
  public readonly title?: string
  public readonly order?: number
  public readonly done?: boolean
  public readonly updatedBy: string

  constructor(props: {
    checklistId: string
    title?: string
    order?: number
    done?: boolean
    updatedBy: string
  }) {
    Object.assign(this, props)
  }
}

export class DeleteTaskChecklistCommand {
  public readonly checklistId: string
  public readonly deletedBy: string

  constructor(props: { checklistId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}
