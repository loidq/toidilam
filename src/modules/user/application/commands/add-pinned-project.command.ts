export class AddPinnedProjectCommand {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,
  ) {}
}
