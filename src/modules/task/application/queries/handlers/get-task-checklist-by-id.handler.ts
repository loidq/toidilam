import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskChecklistEntity } from '../../../domain/entities/task-checklist.entity'
import { TaskChecklistPrismaRepository } from '../../../infrastructure/repositories/task-checklist-prisma.repository'
import { GetTaskChecklistByIdQuery } from '../task-components.queries'

@QueryHandler(GetTaskChecklistByIdQuery)
export class GetTaskChecklistByIdQueryHandler implements IQueryHandler<GetTaskChecklistByIdQuery> {
  constructor(private readonly taskChecklistRepository: TaskChecklistPrismaRepository) {}

  async execute(query: GetTaskChecklistByIdQuery): Promise<TaskChecklistEntity> {
    const { checklistId } = query

    const taskChecklist = await this.taskChecklistRepository.findById(checklistId)
    if (!taskChecklist) {
      throw new NotFoundException(`TaskChecklist with ID ${checklistId} not found`)
    }

    return taskChecklist
  }
}
