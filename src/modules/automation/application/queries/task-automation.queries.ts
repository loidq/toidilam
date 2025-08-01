export class GetTaskAutomationByIdQuery {
  public readonly taskAutomationId: string

  constructor(props: { taskAutomationId: string }) {
    Object.assign(this, props)
  }
}

export class GetTaskAutomationsQuery {
  public readonly organizationId?: string
  public readonly projectId?: string
  public readonly limit?: number
  public readonly offset?: number

  constructor(props: {
    organizationId?: string
    projectId?: string
    limit?: number
    offset?: number
  }) {
    Object.assign(this, props)
  }
}
