import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskChecklistEntity } from '../../../domain/entities/task-checklist.entity'
import { TaskChecklistPrismaRepository } from '../../../infrastructure/repositories/task-checklist-prisma.repository'
import { GetTaskChecklistsByTaskQuery } from '../task-components.queries'

@QueryHandler(GetTaskChecklistsByTaskQuery)
export class GetTaskChecklistsByTaskQueryHandler
  implements IQueryHandler<GetTaskChecklistsByTaskQuery>
{
  constructor(private readonly taskChecklistRepository: TaskChecklistPrismaRepository) {}

  async execute(query: GetTaskChecklistsByTaskQuery): Promise<TaskChecklistEntity[]> {
    const { taskId } = query

    const taskChecklists = await this.taskChecklistRepository.findByTask(taskId)

    return taskChecklists
  }
}
