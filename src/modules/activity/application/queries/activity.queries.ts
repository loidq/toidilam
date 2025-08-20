import { IQuery } from '@nestjs/cqrs'

import { ActivityTargetType } from '../../domain/enums/activity-target-type.enum'
import { ActivityType } from '../../domain/enums/activity-type.enum'

export class GetActivitiesQuery implements IQuery {
  public readonly targetId?: string
  public readonly targetType?: ActivityTargetType
  public readonly type?: ActivityType
  public readonly createdBy?: string
  public readonly search?: string
  public readonly includeData?: boolean
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    targetId?: string
    targetType?: ActivityTargetType
    type?: ActivityType
    createdBy?: string
    search?: string
    includeData?: boolean
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}

export class GetActivityByIdQuery implements IQuery {
  public readonly activityId: string

  constructor(activityId: string) {
    this.activityId = activityId
  }
}

export class GetActivitiesByTargetQuery implements IQuery {
  public readonly targetId: string
  public readonly targetType: ActivityTargetType
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    targetId: string
    targetType: ActivityTargetType
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}
