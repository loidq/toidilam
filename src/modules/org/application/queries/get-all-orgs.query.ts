import { IQuery } from '@nestjs/cqrs'

export class GetAllOrgsQuery implements IQuery {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
  ) {}
}
