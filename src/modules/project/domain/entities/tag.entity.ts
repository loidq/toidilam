import { TaskTagEntity } from '../../../task/domain/entities/task-tag.entity'

export class TagEntity {
  public readonly id?: string
  public name: string
  public color: string
  public projectId: string

  // Relations
  public taskTags: TaskTagEntity[]

  constructor(props: {
    id?: string
    name: string
    color: string
    projectId: string
    taskTags?: TaskTagEntity[]
  }) {
    this.id = props.id
    this.name = props.name
    this.color = props.color
    this.projectId = props.projectId
    this.taskTags = props.taskTags || []
  }

  static create(data: { name: string; color: string; projectId: string }): TagEntity {
    return new TagEntity(data)
  }

  update(data: { name?: string; color?: string }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.color !== undefined) this.color = data.color
  }
}
