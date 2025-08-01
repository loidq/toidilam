import { ActivityEntity } from '../../../activity/domain/entities/activity.entity'
import { OrgMemberEntity } from '../../../org/domain/entities/org-member.entity'
import { MemberEntity } from '../../../project/domain/entities/member.entity'
import { TaskAssigneeEntity } from '../../../task/domain/entities/task-assignee.entity'
import { TimerEntity } from '../../../task/domain/entities/timer.entity'
import { UserStatus } from '../enums/user.enum'
import { FavoriteEntity } from './favorite.entity'

export class UserEntity {
  public readonly id?: string
  public email: string
  public password: string
  public name: string
  public status: UserStatus
  public country?: string
  public bio?: string
  public photo?: string
  public dob?: Date
  public settings: Record<string, any> = {}
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy?: string
  public updatedBy?: string
  public deletedAt?: Date
  public isDeleted: boolean = false

  // Relations
  public taskAssignees: TaskAssigneeEntity[]
  public timers: TimerEntity[]
  public orgMemberships: OrgMemberEntity[]
  public projectMemberships: MemberEntity[]
  public favorites: FavoriteEntity[]
  public activities: ActivityEntity[]

  constructor(props: {
    id?: string
    email: string
    password: string
    name: string
    status?: UserStatus
    country?: string
    bio?: string
    photo?: string
    dob?: Date
    settings?: Record<string, any>
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string
    updatedBy?: string
    deletedAt?: Date
    isDeleted?: boolean
    taskAssignees?: TaskAssigneeEntity[]
    timers?: TimerEntity[]
    orgMemberships?: OrgMemberEntity[]
    projectMemberships?: MemberEntity[]
    favorites?: FavoriteEntity[]
    activities?: ActivityEntity[]
  }) {
    this.id = props.id
    this.email = props.email
    this.password = props.password
    this.name = props.name
    this.status = props.status || UserStatus.ACTIVE
    this.country = props.country
    this.bio = props.bio
    this.photo = props.photo
    this.dob = props.dob
    this.settings = props.settings || {}
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.deletedAt = props.deletedAt
    this.isDeleted = props.isDeleted || false
    this.taskAssignees = props.taskAssignees || []
    this.timers = props.timers || []
    this.orgMemberships = props.orgMemberships || []
    this.projectMemberships = props.projectMemberships || []
    this.favorites = props.favorites || []
    this.activities = props.activities || []
  }

  static create(data: {
    email: string
    password: string
    name: string
    status?: UserStatus
    country?: string
    bio?: string
    photo?: string
    dob?: Date
  }): UserEntity {
    return new UserEntity(data)
  }

  update(data: {
    name?: string
    country?: string
    bio?: string
    photo?: string
    dob?: Date
    settings?: Record<string, any>
  }): UserEntity {
    if (data.name !== undefined) this.name = data.name
    if (data.country !== undefined) this.country = data.country
    if (data.bio !== undefined) this.bio = data.bio
    if (data.photo !== undefined) this.photo = data.photo
    if (data.dob !== undefined) this.dob = data.dob
    if (data.settings !== undefined) {
      this.settings = { ...this.settings, ...data.settings }
    }
    return this
  }
}
