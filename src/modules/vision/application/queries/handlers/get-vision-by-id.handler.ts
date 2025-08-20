import { NotFoundException } from '@nestjs/common'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { VisionEntity } from '../../../domain/entities/vision.entity'
import { VisionPrismaRepository } from '../../../infrastructure/repositories/vision-prisma.repository'
import { GetVisionByIdQuery } from '../vision.queries'

@QueryHandler(GetVisionByIdQuery)
export class GetVisionByIdQueryHandler implements IQueryHandler<GetVisionByIdQuery> {
  constructor(private readonly visionRepository: VisionPrismaRepository) {}

  async execute(query: GetVisionByIdQuery): Promise<VisionEntity> {
    const { visionId } = query

    const vision = await this.visionRepository.findById(visionId, {
      include: {
        project: true,
        organization: true,
        parent: true,
        children: true,
      },
    })

    if (!vision) {
      throw new NotFoundException(`Vision with ID ${visionId} not found`)
    }

    return vision
  }
}
