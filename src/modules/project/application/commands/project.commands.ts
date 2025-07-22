import { ProjectViewType } from '@/modules/project/domain/enums/project-view-type.enum'
export class CreateProjectCommand {
  public readonly name: string
  public readonly organizationId: string
  public readonly createdBy: string
  public readonly projectViews: ProjectViewType[]
  public readonly members?: string[]
  public readonly desc?: string
  public readonly cover?: string
  public readonly icon?: string

  constructor(props: {
    name: string
    organizationId: string
    createdBy: string
    projectViews: ProjectViewType[]
    members?: string[]
    desc?: string
    cover?: string
    icon?: string
  }) {
    Object.assign(this, props)
  }
}

export class UpdateProjectCommand {
  public readonly projectId: string
  public readonly updatedBy: string
  public readonly name?: string
  public readonly desc?: string
  public readonly cover?: string
  public readonly icon?: string
  public readonly isArchived?: boolean
  public readonly countMemberTask?: boolean
  public readonly countProjectTask?: boolean

  constructor(props: {
    projectId: string
    updatedBy: string
    name?: string
    desc?: string
    cover?: string
    icon?: string
    isArchived?: boolean
    countMemberTask?: boolean
    countProjectTask?: boolean
  }) {
    Object.assign(this, props)
  }
}

export class DeleteProjectCommand {
  public readonly projectId: string
  public readonly deletedBy: string

  constructor(props: { projectId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}

export class ArchiveProjectCommand {
  public readonly projectId: string
  public readonly archivedBy: string
  public readonly isArchived: boolean
  constructor(props: { projectId: string; archivedBy: string; isArchived: boolean }) {
    Object.assign(this, props)
  }
}
