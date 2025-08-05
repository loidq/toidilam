import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { VisionEntity } from '../../../domain/entities/vision.entity'
import { VisionPrismaRepository } from '../../../infrastructure/repositories/vision-prisma.repository'
import { GetVisionsQuery } from '../vision.queries'

@QueryHandler(GetVisionsQuery)
export class GetVisionsQueryHandler implements IQueryHandler<GetVisionsQuery> {
  constructor(private readonly visionRepository: VisionPrismaRepository) {}

  async execute(query: GetVisionsQuery): Promise<{
    visions: VisionEntity[]
    total: number
  }> {
    const { projectId, organizationId, month, page = 1, limit = 10 } = query

    const where: any = {}

    if (projectId) {
      where.projectId = projectId
    }

    if (organizationId) {
      where.organizationId = organizationId
    }

    // Filter by month if provided
    if (month) {
      const year = new Date().getFullYear()
      const startDate = new Date(year, month - 1, 1)
      const endDate = new Date(year, month, 0)

      where.OR = [
        {
          startDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        {
          dueDate: {
            gte: startDate,
            lte: endDate,
          },
        },
      ]
    }

    const options = {
      where,
      include: {
        project: true,
        organization: true,
        parent: true,
      },
      orderBy: { createdAt: 'desc' as const },
      skip: (page - 1) * limit,
      take: limit,
    }

    const [visions, total] = await Promise.all([
      this.visionRepository.findMany(options),
      this.visionRepository.count({ where }),
    ])

    return { visions, total }
  }
}
