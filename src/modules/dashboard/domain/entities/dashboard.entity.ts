import { ProjectEntity } from '@/modules/project/domain/entities/project.entity'

import { DashboardComponentEntity } from './dashboard-component.entity'

export class DashboardEntity {
  public readonly id?: string
  public title?: string
  public projectId: string
  public isDefault: boolean

  // Relations
  public dashboardComponents: DashboardComponentEntity[]
  public project?: ProjectEntity

  constructor(props: {
    id?: string
    title?: string
    projectId: string
    isDefault?: boolean
    dashboardComponents?: DashboardComponentEntity[]
    project?: ProjectEntity
  }) {
    this.id = props.id
    this.title = props.title || 'Untitled'
    this.projectId = props.projectId
    this.isDefault = props.isDefault || false
    this.dashboardComponents = props.dashboardComponents || []
    this.project = props.project
  }

  static create(data: { projectId: string; title?: string; isDefault?: boolean }): DashboardEntity {
    return new DashboardEntity(data)
  }

  update(data: { title?: string; isDefault?: boolean }): void {
    if (data.title !== undefined) this.title = data.title
    if (data.isDefault !== undefined) this.isDefault = data.isDefault
  }

  setAsDefault(): void {
    this.isDefault = true
  }

  unsetAsDefault(): void {
    this.isDefault = false
  }
}
