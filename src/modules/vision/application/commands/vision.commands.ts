export class CreateVisionCommand {
  public readonly name: string
  public readonly startDate?: Date
  public readonly dueDate?: Date
  public readonly progress?: number
  public readonly projectId?: string
  public readonly organizationId?: string
  public readonly parentId?: string
  public readonly createdBy: string

  constructor(props: {
    name: string
    startDate?: Date
    dueDate?: Date
    progress?: number
    projectId?: string
    organizationId?: string
    parentId?: string
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateVisionCommand {
  public readonly visionId: string
  public readonly name?: string
  public readonly startDate?: Date
  public readonly dueDate?: Date
  public readonly progress?: number
  public readonly updatedBy: string

  constructor(props: {
    visionId: string
    name?: string
    startDate?: Date
    dueDate?: Date
    progress?: number
    updatedBy: string
  }) {
    Object.assign(this, props)
  }
}

export class DeleteVisionCommand {
  public readonly visionId: string
  public readonly deletedBy: string

  constructor(props: { visionId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}
