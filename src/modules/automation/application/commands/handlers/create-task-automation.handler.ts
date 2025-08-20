import { ForbiddenException, Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IProjectRepository } from '@/modules/project'

import { TaskAutomationEntity } from '../../../domain/entities/task-automation.entity'
import { TaskAutomationPrismaRepository } from '../../../infrastructure/repositories/task-automation-prisma.repository'
import { CreateTaskAutomationCommand } from '../task-automation.commands'

@CommandHandler(CreateTaskAutomationCommand)
export class CreateTaskAutomationCommandHandler
  implements ICommandHandler<CreateTaskAutomationCommand>
{
  constructor(
    private readonly taskAutomationRepository: TaskAutomationPrismaRepository,

    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async execute(command: CreateTaskAutomationCommand): Promise<TaskAutomationEntity> {
    const { organizationId, projectId, when, then, createdBy } = command

    const project = await this.projectRepository.findById(projectId)
    if (!project || project.isArchived) {
      throw new ForbiddenException(`Project with ID not found`)
    }

    const taskAutomation = TaskAutomationEntity.create({
      organizationId,
      projectId,
      when,
      then,
      createdBy,
    })

    const savedTaskAutomation = await this.taskAutomationRepository.create(taskAutomation)

    return savedTaskAutomation
  }
}
