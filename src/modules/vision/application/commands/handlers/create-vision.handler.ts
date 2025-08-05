import { ForbiddenException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project'

import { VisionEntity } from '../../../domain/entities/vision.entity'
import { VisionPrismaRepository } from '../../../infrastructure/repositories/vision-prisma.repository'
import { CreateVisionCommand } from '../vision.commands'

@CommandHandler(CreateVisionCommand)
export class CreateVisionCommandHandler implements ICommandHandler<CreateVisionCommand> {
  constructor(
    private readonly visionRepository: VisionPrismaRepository,

    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: CreateVisionCommand): Promise<VisionEntity> {
    const { name, startDate, dueDate, progress, projectId, organizationId, parentId, createdBy } =
      command

    // Validate project if projectId is provided
    if (projectId) {
      const project = await this.projectRepository.findById(projectId)
      if (!project || project.isArchived) {
        throw new ForbiddenException(`Project with ID ${projectId} not found or archived`)
      }
    }

    const vision = VisionEntity.create({
      name,
      startDate,
      dueDate,
      progress,
      projectId,
      organizationId,
      parentId,
      createdBy,
    })

    const savedVision = await this.visionRepository.create(vision)

    return savedVision
  }
}
