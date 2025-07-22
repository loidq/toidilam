import { UserStatus } from '../enums/user.enum'

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
  }) {
    Object.assign(this, props)
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
