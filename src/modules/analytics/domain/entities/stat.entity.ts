import { StatType } from '../enums/stat-type.enum'

export interface IStatData {
  [key: string]: any
}

export class StatEntity {
  public readonly id?: string
  public type: StatType
  public data: IStatData
  public userId?: string
  public projectId: string
  public organizationId?: string
  public year: number
  public month: number
  public date: number
  public updatedAt?: Date

  constructor(props: {
    id?: string
    type: StatType
    data?: IStatData
    userId?: string
    projectId: string
    organizationId?: string
    year: number
    month: number
    date: number
    updatedAt?: Date
  }) {
    this.id = props.id
    this.type = props.type
    this.data = props.data || {}
    this.userId = props.userId
    this.projectId = props.projectId
    this.organizationId = props.organizationId
    this.year = props.year
    this.month = props.month
    this.date = props.date
    this.updatedAt = props.updatedAt
  }

  static create(data: {
    type: StatType
    projectId: string
    year: number
    month: number
    date: number
    data?: IStatData
    userId?: string
    organizationId?: string
  }): StatEntity {
    return new StatEntity(data)
  }

  update(data: { data?: IStatData }): void {
    if (data.data !== undefined) this.data = { ...this.data, ...data.data }
  }
}
