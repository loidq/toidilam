import { ICommand } from '@nestjs/cqrs'

export class CreateOrgCommand implements ICommand {
  public readonly name: string
  public readonly slug: string
  public readonly createdBy: string
  public readonly desc?: string
  public readonly cover?: string
  public readonly avatar?: string
  public readonly maxStorageSize?: number
  constructor(props: {
    name: string
    slug: string
    createdBy: string
    desc?: string
    cover?: string
    avatar?: string
    maxStorageSize?: number
  }) {
    Object.assign(this, props)
  }
}

export class UpdateOrgCommand implements ICommand {
  public readonly organizationId: string
  public readonly updatedBy: string
  public readonly name?: string
  public readonly slug?: string
  public readonly desc?: string
  public readonly cover?: string
  public readonly avatar?: string
  public readonly maxStorageSize?: number
  constructor(props: {
    organizationId: string
    updatedBy: string
    name?: string
    slug?: string
    desc?: string
    cover?: string
    avatar?: string
    maxStorageSize?: number
  }) {
    Object.assign(this, props)
  }
}
