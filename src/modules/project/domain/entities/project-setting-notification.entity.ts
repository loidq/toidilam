export class ProjectSettingNotificationEntity {
  public readonly id?: string
  public userId: string
  public projectId: string
  public taskChanges: boolean
  public remind: boolean
  public overdue: boolean
  public createdAt?: Date
  public createdBy: string

  constructor(props: {
    id?: string
    userId: string
    projectId: string
    taskChanges?: boolean
    remind?: boolean
    overdue?: boolean
    createdAt?: Date
    createdBy: string
  }) {
    this.id = props.id
    this.userId = props.userId
    this.projectId = props.projectId
    this.taskChanges = props.taskChanges || false
    this.remind = props.remind || false
    this.overdue = props.overdue || false
    this.createdAt = props.createdAt
    this.createdBy = props.createdBy
  }

  static create(data: {
    userId: string
    projectId: string
    createdBy: string
    taskChanges?: boolean
    remind?: boolean
    overdue?: boolean
  }): ProjectSettingNotificationEntity {
    return new ProjectSettingNotificationEntity(data)
  }

  update(data: { taskChanges?: boolean; remind?: boolean; overdue?: boolean }): void {
    if (data.taskChanges !== undefined) this.taskChanges = data.taskChanges
    if (data.remind !== undefined) this.remind = data.remind
    if (data.overdue !== undefined) this.overdue = data.overdue
  }
}
