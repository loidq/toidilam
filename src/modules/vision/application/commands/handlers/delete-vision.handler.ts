import { NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { VisionPrismaRepository } from '../../../infrastructure/repositories/vision-prisma.repository'
import { DeleteVisionCommand } from '../vision.commands'

@CommandHandler(DeleteVisionCommand)
export class DeleteVisionCommandHandler implements ICommandHandler<DeleteVisionCommand> {
  constructor(private readonly visionRepository: VisionPrismaRepository) {}

  async execute(command: DeleteVisionCommand): Promise<void> {
    const { visionId } = command

    const existingVision = await this.visionRepository.findById(visionId)
    if (!existingVision) {
      throw new NotFoundException(`Vision with ID ${visionId} not found`)
    }

    await this.visionRepository.delete({ id: visionId })
  }
}
