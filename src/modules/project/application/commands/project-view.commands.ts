import { ProjectViewData } from '../../domain/entities/project-view.entity'
import { ProjectViewType } from '../../domain/enums/project-view-type.enum'

export class CreateProjectViewCommand {
  public readonly name?: string
  public readonly type: ProjectViewType
  public readonly onlyMe: boolean
  public readonly icon?: string
  public readonly projectId: string
  public readonly order?: number
  public readonly data?: ProjectViewData
  public readonly createdBy: string

  constructor(props: {
    name?: string
    type: ProjectViewType
    onlyMe: boolean
    icon?: string
    projectId: string
    order?: number
    data?: ProjectViewData
    createdBy: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateProjectViewCommand {
  public readonly projectViewId: string
  public readonly name?: string
  public readonly type?: ProjectViewType
  public readonly onlyMe?: boolean
  public readonly icon?: string
  public readonly order?: number
  public readonly data?: ProjectViewData
  public readonly updatedBy?: string

  constructor(props: {
    projectViewId: string
    name?: string
    type?: ProjectViewType
    onlyMe?: boolean
    icon?: string
    order?: number
    data?: ProjectViewData
    updatedBy?: string
  }) {
    Object.assign(this, props)
  }
}

export class DeleteProjectViewCommand {
  public readonly projectViewId: string
  public readonly deletedBy: string

  constructor(props: { projectViewId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}
