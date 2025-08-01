import {
  ITaskAutomationThen,
  ITaskAutomationWhen,
} from '../../domain/entities/task-automation.entity'

export class CreateTaskAutomationCommand {
  public readonly organizationId: string
  public readonly projectId: string
  public readonly when: ITaskAutomationWhen
  public readonly then: ITaskAutomationThen
  public readonly createdBy: string

  constructor(props: {
    organizationId: string
    projectId: string
    when: ITaskAutomationWhen
    then: ITaskAutomationThen
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateTaskAutomationCommand {
  public readonly taskAutomationId: string
  public readonly updatedBy: string
  public readonly when?: ITaskAutomationWhen
  public readonly then?: ITaskAutomationThen

  constructor(props: {
    taskAutomationId: string
    updatedBy: string
    when?: ITaskAutomationWhen
    then?: ITaskAutomationThen
  }) {
    Object.assign(this, props)
  }
}

export class DeleteTaskAutomationCommand {
  public readonly taskAutomationId: string

  constructor(props: { taskAutomationId: string }) {
    Object.assign(this, props)
  }
}
