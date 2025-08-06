export class RemovePinnedProjectCommand {
  constructor(
    public readonly userId: string,
    public readonly projectId: string,
  ) {}
}
