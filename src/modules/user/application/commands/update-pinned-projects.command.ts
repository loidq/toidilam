export class UpdatePinnedProjectsCommand {
  constructor(
    public readonly userId: string,
    public readonly projectIds: string[],
  ) {}
}
