import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TaskAutomationEntity } from '../../../domain/entities/task-automation.entity'
import { TaskAutomationPrismaRepository } from '../../../infrastructure/repositories/task-automation-prisma.repository'
import { GetTaskAutomationsQuery } from '../task-automation.queries'

@QueryHandler(GetTaskAutomationsQuery)
export class GetTaskAutomationsQueryHandler implements IQueryHandler<GetTaskAutomationsQuery> {
  constructor(private readonly taskAutomationRepository: TaskAutomationPrismaRepository) {}

  async execute(query: GetTaskAutomationsQuery): Promise<TaskAutomationEntity[]> {
    const { organizationId, projectId, limit, offset } = query

    const where: any = {}
    if (organizationId) where.organizationId = organizationId
    if (projectId) where.projectId = projectId

    const options: any = {
      where,
    }

    if (limit) options.take = limit
    if (offset) options.skip = offset

    return this.taskAutomationRepository.findMany(options)
  }
}
