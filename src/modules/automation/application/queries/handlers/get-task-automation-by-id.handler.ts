import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskAutomationEntity } from '../../../domain/entities/task-automation.entity'
import { TaskAutomationPrismaRepository } from '../../../infrastructure/repositories/task-automation-prisma.repository'
import { GetTaskAutomationByIdQuery } from '../task-automation.queries'

@QueryHandler(GetTaskAutomationByIdQuery)
export class GetTaskAutomationByIdQueryHandler
  implements IQueryHandler<GetTaskAutomationByIdQuery>
{
  constructor(private readonly taskAutomationRepository: TaskAutomationPrismaRepository) {}

  async execute(query: GetTaskAutomationByIdQuery): Promise<TaskAutomationEntity> {
    const { taskAutomationId } = query

    const taskAutomation = await this.taskAutomationRepository.findById(taskAutomationId)
    if (!taskAutomation) {
      throw new NotFoundException(`TaskAutomation with ID ${taskAutomationId} not found`)
    }

    return taskAutomation
  }
}
