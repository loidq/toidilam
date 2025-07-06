import { ICommand } from '@nestjs/cqrs'

export class UpdateOrgCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly updatedBy: string,
    public readonly name?: string,
    public readonly slug?: string,
    public readonly desc?: string,
    public readonly cover?: string,
    public readonly avatar?: string,
    public readonly maxStorageSize?: number,
  ) {}
}
