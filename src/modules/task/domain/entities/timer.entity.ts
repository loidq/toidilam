import { UserEntity } from '../../../user/domain/entities/user.entity'
import { TaskEntity } from './task.entity'

export class TimerEntity {
  public readonly id?: string
  public taskId: string
  public userId: string
  public startTime: Date
  public endTime?: Date
  public duration: number
  public createdAt?: Date
  public updatedAt?: Date

  // Relations
  public task?: TaskEntity
  public user?: UserEntity

  constructor(props: {
    id?: string
    taskId: string
    userId: string
    startTime: Date
    endTime?: Date
    duration?: number
    createdAt?: Date
    updatedAt?: Date
    task?: TaskEntity
    user?: UserEntity
  }) {
    this.id = props.id
    this.taskId = props.taskId
    this.userId = props.userId
    this.startTime = props.startTime
    this.endTime = props.endTime
    this.duration = props.duration || 0
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.task = props.task
    this.user = props.user
  }

  static create(data: { taskId: string; userId: string; startTime: Date }): TimerEntity {
    return new TimerEntity(data)
  }

  stop(endTime: Date): void {
    this.endTime = endTime
    this.duration = Math.floor((endTime.getTime() - this.startTime.getTime()) / 1000) // duration in seconds
  }

  getDurationInMinutes(): number {
    return Math.floor(this.duration / 60)
  }

  getDurationInHours(): number {
    return Math.floor(this.duration / 3600)
  }

  isRunning(): boolean {
    return !this.endTime
  }
}
