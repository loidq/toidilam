import { StatusType } from '../../domain/enums/status-type.enum'

export class CreateTaskStatusCommand {
  public readonly name: string
  public readonly color: string
  public readonly order: number
  public readonly projectId: string
  public readonly type?: StatusType
  public readonly createdBy: string

  constructor(props: {
    name: string
    color: string
    order: number
    projectId: string
    type?: StatusType
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskStatusCommand {
  public readonly statusId: string
  public readonly name?: string
  public readonly color?: string
  public readonly order?: number
  public readonly type?: StatusType
  public readonly updatedBy: string

  constructor(props: {
    statusId: string
    name?: string
    color?: string
    order?: number
    type?: StatusType
    updatedBy: string
  }) {
    Object.assign(this, props)
  }
}

export class DeleteTaskStatusCommand {
  public readonly statusId: string
  public readonly deletedBy: string

  constructor(props: { statusId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskStatusOrderCommand {
  public readonly statusOrders: { id: string; order: number }[]
  public readonly updatedBy: string

  constructor(props: { statusOrders: { id: string; order: number }[]; updatedBy: string }) {
    Object.assign(this, props)
  }
}
