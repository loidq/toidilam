import { ICommand } from '@nestjs/cqrs'
export class CreateOrgCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly createdBy: string,
    public readonly desc?: string,
    public readonly cover?: string,
    public readonly avatar?: string,
    public readonly maxStorageSize?: number,
    public readonly updatedBy?: string,
  ) {}
}
