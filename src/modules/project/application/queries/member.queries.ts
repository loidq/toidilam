export class GetMembersQuery {
  public readonly projectId: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId: string; page?: number; limit?: number }) {
    Object.assign(this, props)
  }
}
