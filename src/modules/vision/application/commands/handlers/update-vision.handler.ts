import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { VisionEntity } from '../../../domain/entities/vision.entity'
import { VisionPrismaRepository } from '../../../infrastructure/repositories/vision-prisma.repository'
import { UpdateVisionCommand } from '../vision.commands'

@CommandHandler(UpdateVisionCommand)
export class UpdateVisionCommandHandler implements ICommandHandler<UpdateVisionCommand> {
  constructor(private readonly visionRepository: VisionPrismaRepository) {}

  async execute(command: UpdateVisionCommand): Promise<VisionEntity> {
    const { visionId, name, startDate, dueDate, progress, updatedBy } = command

    const existingVision = await this.visionRepository.findById(visionId)
    if (!existingVision) {
      throw new NotFoundException(`Vision with ID ${visionId} not found`)
    }

    existingVision.update({
      name,
      startDate,
      dueDate,
      progress,
      updatedBy,
    })

    const updatedVision = await this.visionRepository.update({ id: visionId }, existingVision)

    return updatedVision
  }
}
