export interface ITaskAutomationWhen {
  [key: string]: any
}

export interface ITaskAutomationThen {
  [key: string]: any
}

export class TaskAutomationEntity {
  public readonly id?: string
  public organizationId: string
  public projectId: string
  public when: ITaskAutomationWhen
  public then: ITaskAutomationThen
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    organizationId: string
    projectId: string
    when: ITaskAutomationWhen
    then: ITaskAutomationThen
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.organizationId = props.organizationId
    this.projectId = props.projectId
    this.when = props.when
    this.then = props.then
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    organizationId: string
    projectId: string
    when: ITaskAutomationWhen
    then: ITaskAutomationThen
    createdBy: string
  }): TaskAutomationEntity {
    return new TaskAutomationEntity(data)
  }

  update(data: {
    when?: ITaskAutomationWhen
    then?: ITaskAutomationThen
    updatedBy?: string
  }): void {
    if (data.when !== undefined) this.when = { ...this.when, ...data.when }
    if (data.then !== undefined) this.then = { ...this.then, ...data.then }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
