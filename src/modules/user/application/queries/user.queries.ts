export class GetUserByIdQuery {
  constructor(public readonly userId: string) {}
}
export class GetUserByEmailQuery {
  constructor(public readonly email: string) {}
}

export * from './get-pinned-projects-with-details.query'
export * from './get-pinned-projects.query'
