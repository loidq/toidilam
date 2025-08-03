export class GetDashboardByIdQuery {
  constructor(public readonly dashboardId: string) {}
}

export class GetDashboardsQuery {
  public readonly projectId: string
  public readonly isDefault?: boolean
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { projectId: string; isDefault?: boolean; page?: number; limit?: number }) {
    this.projectId = props.projectId
    this.isDefault = props.isDefault
    this.page = props.page
    this.limit = props.limit
  }
}

export class GetDashboardComponentByIdQuery {
  constructor(public readonly dashboardcomponentId: string) {}
}

export class GetDashboardComponentsQuery {
  public readonly dashboardId: string
  public readonly type?: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: { dashboardId: string; type?: string; page?: number; limit?: number }) {
    this.dashboardId = props.dashboardId
    this.type = props.type
    this.page = props.page
    this.limit = props.limit
  }
}

export class GetDashboardSummaryQuery {
  public readonly startDate?: Date
  public readonly endDate?: Date
  public readonly projectIds?: string[]
  public readonly statusIds?: string[]
  public readonly priority?: string[]
  public readonly assigneeIds?: string[]

  constructor(props: {
    projectIds?: string[]
    statusIds?: string[]
    startDate?: Date
    endDate?: Date
    priority?: string[]
    assigneeIds?: string[]
  }) {
    this.projectIds = props.projectIds
    this.statusIds = props.statusIds
    this.startDate = props.startDate
    this.endDate = props.endDate
    this.priority = props.priority
    this.assigneeIds = props.assigneeIds
  }
}
/*
startDate?: Date
  endDate?: Date
  projectIds?: string[]
  xAxis?: {
    assigneeIds?: string[]
  }
  series?: {
    statusIds?: string[]
  }
*/
export class GetDashboardColumnQuery {
  public readonly startDate?: Date
  public readonly endDate?: Date
  public readonly projectIds?: string[]
  public readonly xAxis?: {
    assigneeIds?: string[]
  }
  public readonly series?: {
    statusIds?: string[]
  }

  constructor(props: {
    startDate?: Date
    endDate?: Date
    projectIds?: string[]
    xAxis?: {
      assigneeIds?: string[]
    }
    series?: {
      statusIds?: string[]
    }
  }) {
    Object.assign(this, props)
  }
}

export type DateOperation = '>' | '>=' | '=' | '<' | '<='
export type DateString = 'today' | 'week' | 'month'
export type DateWithOperation = [DateOperation, DateString]

export class GetDashboardBurnChartQuery {
  public readonly startDate?: Date
  public readonly endDate?: Date
  public readonly projectIds?: string[]
  public readonly statusIds?: string[]
  public readonly tagIds?: string[]
  public readonly assigneeIds?: string[]
  public readonly icon?: string
  public readonly title?: string
  public readonly points?: number[]
  public readonly priority?: string[]
  public readonly dateQuery?: DateWithOperation
  public readonly type: string

  constructor(props: {
    startDate?: Date
    endDate?: Date
    projectIds?: string[]
    statusIds?: string[]
    tagIds?: string[]
    assigneeIds?: string[]
    icon?: string
    title?: string
    points?: number[]
    priority?: string[]
    dateQuery?: DateWithOperation
    type?: string
  }) {
    Object.assign(this, props)
  }
}
