import { ActivityTargetType } from '../enums/activity-target-type.enum'
import { ActivityType } from '../enums/activity-type.enum'

export interface IActivityData {
  [key: string]: any
}

export class ActivityEntity {
  public readonly id?: string
  public targetId: string
  public targetType: ActivityTargetType
  public type: ActivityType
  public data: IActivityData
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    targetId: string
    targetType: ActivityTargetType
    type: ActivityType
    data?: IActivityData
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.targetId = props.targetId
    this.targetType = props.targetType
    this.type = props.type
    this.data = props.data || {}
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    targetId: string
    targetType: ActivityTargetType
    type: ActivityType
    createdBy: string
    data?: IActivityData
  }): ActivityEntity {
    return new ActivityEntity(data)
  }

  update(data: { data?: IActivityData; updatedBy?: string }): void {
    if (data.data !== undefined) this.data = { ...this.data, ...data.data }
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
