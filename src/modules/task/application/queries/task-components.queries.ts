export class GetTaskStatusByIdQuery {
  constructor(public readonly statusId: string) {}
}

export class GetTaskStatusesByProjectQuery {
  constructor(public readonly projectId: string) {}
}

export class GetTaskChecklistByIdQuery {
  constructor(public readonly checklistId: string) {}
}

export class GetTaskChecklistsByTaskQuery {
  constructor(public readonly taskId: string) {}
}
