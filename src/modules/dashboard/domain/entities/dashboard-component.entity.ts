import { DashboardComponentType } from '../enums/dashboard-component-type.enum'

export interface IDashboardComponentConfig {
  [key: string]: any
}

export class DashboardComponentEntity {
  public readonly id?: string
  public dashboardId?: string
  public title?: string
  public type?: DashboardComponentType
  public config?: IDashboardComponentConfig
  public x?: number
  public y?: number
  public width?: number
  public height?: number
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  constructor(props: {
    id?: string
    dashboardId?: string
    title?: string
    type?: DashboardComponentType
    config?: IDashboardComponentConfig
    x?: number
    y?: number
    width?: number
    height?: number
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
  }) {
    this.id = props.id
    this.dashboardId = props.dashboardId
    this.title = props.title
    this.type = props.type
    this.config = props.config
    this.x = props.x || 0
    this.y = props.y || 0
    this.width = props.width || 3
    this.height = props.height || 1
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
  }

  static create(data: {
    createdBy: string
    dashboardId?: string
    title?: string
    type?: DashboardComponentType
    config?: IDashboardComponentConfig
    x?: number
    y?: number
    width?: number
    height?: number
  }): DashboardComponentEntity {
    return new DashboardComponentEntity(data)
  }

  update(data: {
    title?: string
    type?: DashboardComponentType
    config?: IDashboardComponentConfig
    x?: number
    y?: number
    width?: number
    height?: number
    updatedBy?: string
  }): void {
    if (data.title !== undefined) this.title = data.title
    if (data.type !== undefined) this.type = data.type
    if (data.config !== undefined) this.config = { ...this.config, ...data.config }
    if (data.x !== undefined) this.x = data.x
    if (data.y !== undefined) this.y = data.y
    if (data.width !== undefined) this.width = data.width
    if (data.height !== undefined) this.height = data.height
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
