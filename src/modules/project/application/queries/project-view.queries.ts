export class GetProjectViewsQuery {
  public readonly projectId: string
  public readonly onlyMe?: boolean
  public readonly userId?: string
  constructor(props: { projectId: string; onlyMe?: boolean; userId?: string }) {
    Object.assign(this, props)
  }
}

export class GetProjectViewQuery {
  constructor(public readonly projectViewId: string) {}
}
