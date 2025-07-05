import { ICommand } from '@nestjs/cqrs'

export class RegisterCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
