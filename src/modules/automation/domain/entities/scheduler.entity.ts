export interface ISchedulerTrigger {
  [key: string]: any
}

export interface ISchedulerAction {
  [key: string]: any
}

export class SchedulerEntity {
  public readonly id?: string
  public organizationId: string
  public projectId: string
  public cronId?: string
  public trigger: ISchedulerTrigger
  public action: ISchedulerAction
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    organizationId: string
    projectId: string
    cronId?: string
    trigger: ISchedulerTrigger
    action: ISchedulerAction
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.organizationId = props.organizationId
    this.projectId = props.projectId
    this.cronId = props.cronId
    this.trigger = props.trigger
    this.action = props.action
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    organizationId: string
    projectId: string
    trigger: ISchedulerTrigger
    action: ISchedulerAction
    createdBy: string
    cronId?: string
  }): SchedulerEntity {
    return new SchedulerEntity(data)
  }

  update(data: {
    cronId?: string
    trigger?: ISchedulerTrigger
    action?: ISchedulerAction
    updatedBy?: string
  }): void {
    if (data.cronId !== undefined) this.cronId = data.cronId
    if (data.trigger !== undefined) this.trigger = { ...this.trigger, ...data.trigger }
    if (data.action !== undefined) this.action = { ...this.action, ...data.action }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
