import { ProjectEntity } from '@/modules/project/domain/entities/project.entity'

import { TaskEntity } from './task.entity'

export class CommentEntity {
  public readonly id?: string
  public taskId: string
  public content: string
  public projectId?: string
  public createdAt?: Date
  public updatedAt?: Date
  public createdBy: string
  public updatedBy?: string

  // Relations
  public task?: TaskEntity
  public project?: ProjectEntity
  public user?: any

  constructor(props: {
    id?: string
    taskId: string
    content: string
    projectId?: string
    createdAt?: Date
    updatedAt?: Date
    createdBy: string
    updatedBy?: string
    task?: TaskEntity
    project?: ProjectEntity
    user?: any
  }) {
    this.id = props.id
    this.taskId = props.taskId
    this.content = props.content
    this.projectId = props.projectId
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.createdBy = props.createdBy
    this.updatedBy = props.updatedBy
    this.task = props.task
    this.project = props.project
    this.user = props.user
  }
  static create(data: {
    taskId: string
    content: string
    createdBy: string
    projectId?: string
  }): CommentEntity {
    return new CommentEntity(data)
  }
  update(data: { content?: string; updatedBy?: string }): void {
    if (data.content !== undefined) this.content = data.content
    if (data.updatedBy !== undefined) this.updatedBy = data.updatedBy
  }
}
