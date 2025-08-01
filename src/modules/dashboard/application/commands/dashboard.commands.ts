import { DashboardComponentType } from '@/modules/dashboard/domain/enums/dashboard-component-type.enum'

export class CreateDashboardCommand {
  public readonly title?: string
  public readonly projectId: string
  public readonly isDefault?: boolean

  constructor(props: { title?: string; projectId: string; isDefault?: boolean }) {
    this.title = props.title
    this.projectId = props.projectId
    this.isDefault = props.isDefault
  }
}

export class UpdateDashboardCommand {
  public readonly dashboardId: string
  public readonly title?: string
  public readonly isDefault?: boolean

  constructor(props: { dashboardId: string; title?: string; isDefault?: boolean }) {
    this.dashboardId = props.dashboardId
    this.title = props.title
    this.isDefault = props.isDefault
  }
}

export class DeleteDashboardCommand {
  constructor(public readonly dashboardId: string) {}
}

export class CreateDashboardComponentCommand {
  public readonly dashboardId: string
  public readonly title?: string
  public readonly type?: DashboardComponentType
  public readonly config?: Record<string, any>
  public readonly x?: number
  public readonly y?: number
  public readonly width?: number
  public readonly height?: number
  public readonly createdBy: string

  constructor(props: {
    dashboardId: string
    title?: string
    type?: DashboardComponentType
    config?: Record<string, any>
    x?: number
    y?: number
    width?: number
    height?: number
    createdBy: string
  }) {
    this.dashboardId = props.dashboardId
    this.title = props.title
    this.type = props.type
    this.config = props.config
    this.x = props.x
    this.y = props.y
    this.width = props.width
    this.height = props.height
    this.createdBy = props.createdBy
  }
}

export class UpdateDashboardComponentCommand {
  public readonly dashboardComponentId: string
  public readonly title?: string
  public readonly type?: string
  public readonly config?: Record<string, any>
  public readonly x?: number
  public readonly y?: number
  public readonly width?: number
  public readonly height?: number
  public readonly updatedBy?: string

  constructor(props: {
    dashboardComponentId: string
    title?: string
    type?: string
    config?: Record<string, any>
    x?: number
    y?: number
    width?: number
    height?: number
    updatedBy?: string
  }) {
    this.dashboardComponentId = props.dashboardComponentId
    this.title = props.title
    this.type = props.type
    this.config = props.config
    this.x = props.x
    this.y = props.y
    this.width = props.width
    this.height = props.height
    this.updatedBy = props.updatedBy
  }
}

export class DeleteDashboardComponentCommand {
  constructor(public readonly dashboardComponentId: string) {}
}
