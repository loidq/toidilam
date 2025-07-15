export class CreateProjectCommand {
  constructor(
    public readonly name: string,
    public readonly organizationId: string,
    public readonly createdBy: string,
    public readonly desc?: string,
    public readonly cover?: string,
    public readonly icon?: string,
  ) {}
}

export class UpdateProjectCommand {
  constructor(
    public readonly id: string,
    public readonly updatedBy: string,
    public readonly name?: string,
    public readonly desc?: string,
    public readonly cover?: string,
    public readonly icon?: string,
    public readonly isArchived?: boolean,
    public readonly countMemberTask?: boolean,
    public readonly countProjectTask?: boolean,
  ) {}
}

export class DeleteProjectCommand {
  constructor(
    public readonly id: string,
    public readonly deletedBy: string,
  ) {}
}

export class ArchiveProjectCommand {
  constructor(
    public readonly id: string,
    public readonly archivedBy: string,
  ) {}
}

export class UnarchiveProjectCommand {
  constructor(
    public readonly id: string,
    public readonly unarchivedBy: string,
  ) {}
}
