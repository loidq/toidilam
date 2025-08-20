import { IQuery } from '@nestjs/cqrs'

export class GetCommentsQuery implements IQuery {
  public readonly taskId?: string
  public readonly projectId?: string
  public readonly search?: string
  public readonly page?: number
  public readonly limit?: number

  constructor(props: {
    taskId?: string
    projectId?: string
    search?: string
    page?: number
    limit?: number
  }) {
    Object.assign(this, props)
  }
}

export class GetCommentByIdQuery implements IQuery {
  public readonly commentId: string

  constructor(commentId: string) {
    this.commentId = commentId
  }
}
