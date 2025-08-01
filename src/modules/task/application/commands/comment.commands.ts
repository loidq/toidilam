import { ICommand } from '@nestjs/cqrs'

export class CreateCommentCommand implements ICommand {
  public readonly taskId: string
  public readonly content: string
  public readonly createdBy: string
  public readonly projectId?: string

  constructor(props: { taskId: string; content: string; createdBy: string; projectId?: string }) {
    Object.assign(this, props)
  }
}

export class UpdateCommentCommand implements ICommand {
  public readonly commentId: string
  public readonly content: string
  public readonly updatedBy: string

  constructor(props: { commentId: string; content: string; updatedBy: string }) {
    Object.assign(this, props)
  }
}

export class DeleteCommentCommand implements ICommand {
  public readonly commentId: string
  public readonly deletedBy: string

  constructor(props: { commentId: string; deletedBy: string }) {
    Object.assign(this, props)
  }
}
