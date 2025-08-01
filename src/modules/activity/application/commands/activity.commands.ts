import { ICommand } from '@nestjs/cqrs'

import { ActivityTargetType } from '../../domain/enums/activity-target-type.enum'
import { ActivityType } from '../../domain/enums/activity-type.enum'

export class CreateActivityCommand implements ICommand {
  public readonly targetId: string
  public readonly targetType: ActivityTargetType
  public readonly type: ActivityType
  public readonly createdBy: string
  public readonly data?: Record<string, any>

  constructor(props: {
    targetId: string
    targetType: ActivityTargetType
    type: ActivityType
    createdBy: string
    data?: Record<string, any>
  }) {
    Object.assign(this, props)
  }
}

export class UpdateActivityCommand implements ICommand {
  public readonly activityId: string
  public readonly data: Record<string, any>
  public readonly updatedBy: string

  constructor(props: { activityId: string; data: Record<string, any>; updatedBy: string }) {
    Object.assign(this, props)
  }
}

export class DeleteActivityCommand implements ICommand {
  public readonly activityId: string
  public readonly deletedBy: string

  constructor(props: { activityId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}

export class BulkCreateActivitiesCommand implements ICommand {
  public readonly activities: {
    targetId: string
    targetType: ActivityTargetType
    type: ActivityType
    createdBy: string
    data?: Record<string, any>
  }[]

  constructor(props: {
    activities: {
      targetId: string
      targetType: ActivityTargetType
      type: ActivityType
      createdBy: string
      data?: Record<string, any>
    }[]
  }) {
    Object.assign(this, props)
  }
}
