export class GetMembersQuery {
  public readonly projectId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}

export class GetMemberQuery {
  public readonly projectId: string
  public readonly userId: string

  constructor(props: { projectId: string; userId: string }) {
    Object.assign(this, props)
  }
}
