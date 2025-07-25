import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { IOrgRepository } from '@/modules/org/domain/repositories/org.repository'
import { MemberEntity } from '@/modules/project/domain/entities/member.entity'
import { MemberRole } from '@/modules/project/domain/enums/member.enum'
import { IMemberRepository } from '@/modules/project/domain/repositories/member.repository'

import { ProjectViewEntity } from '../../../domain/entities/project-view.entity'
import { ProjectEntity } from '../../../domain/entities/project.entity'
import { ProjectViewType } from '../../../domain/enums/project-view-type.enum'
import { IProjectViewRepository } from '../../../domain/repositories/project-view.repository'
import { IProjectRepository } from '../../../domain/repositories/project.repository'
import { CreateProjectCommand } from '../project.commands'

@Injectable()
@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand> {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private readonly projectRepository: IProjectRepository,

    @Inject('PROJECT_VIEW_REPOSITORY')
    private readonly projectViewRepository: IProjectViewRepository,

    @Inject('ORG_REPOSITORY')
    private readonly organizationRepository: IOrgRepository,

    @Inject('MEMBER_REPOSITORY')
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(command: CreateProjectCommand): Promise<ProjectEntity> {
    const { name, organizationId, createdBy, desc, cover, icon, projectViews, members } = command
    const existingOrg = await this.organizationRepository.findById(organizationId)
    if (!existingOrg) {
      throw new NotFoundException('Organization not found')
    }

    // Create project
    const projectData = ProjectEntity.create({
      name,
      organizationId,
      createdBy,
      desc,
      cover,
      icon,
    })
    const createdProject = await this.projectRepository.create(projectData)
    const memberEntities =
      members?.map(
        memberId =>
          new MemberEntity({
            userId: memberId,
            projectId: createdProject.id!,
            role: createdBy == memberId ? MemberRole.LEADER : MemberRole.MEMBER,
            createdBy,
          }),
      ) || []
    // Add members to the project
    if (memberEntities.length > 0) {
      await this.memberRepository.createMany(memberEntities)
    }
    if (projectViews && projectViews.length > 0) {
      const viewsToCreate = this.createProjectViewsFromTypes({
        projectId: createdProject.id!,
        createdBy,
        viewTypes: projectViews,
        members,
      })
      console.log('Creating project views:', viewsToCreate)
      for (const viewData of viewsToCreate) {
        await this.projectViewRepository.create(viewData)
      }
    }

    return createdProject
  }

  private createProjectViewsFromTypes({
    projectId,
    createdBy,
    viewTypes,
    members,
  }: {
    projectId: string
    createdBy: string
    viewTypes: ProjectViewType[]
    members?: string[]
  }): ProjectViewEntity[] {
    const viewTemplates: Record<ProjectViewType, Omit<ProjectViewEntity, 'id'>> = {
      [ProjectViewType.LIST]: ProjectViewEntity.create({
        name: 'List View',
        type: ProjectViewType.LIST,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'list',
        order: 1,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.BOARD]: ProjectViewEntity.create({
        name: 'Board View',
        type: ProjectViewType.BOARD,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'board',
        order: 2,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.CALENDAR]: ProjectViewEntity.create({
        name: 'Calendar View',
        type: ProjectViewType.CALENDAR,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'calendar',
        order: 3,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.TIMELINE]: ProjectViewEntity.create({
        name: 'Timeline View',
        type: ProjectViewType.TIMELINE,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'timeline',
        order: 4,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.GOAL]: ProjectViewEntity.create({
        name: 'Goal View',
        type: ProjectViewType.GOAL,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'goal',
        order: 5,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.TEAM]: ProjectViewEntity.create({
        name: 'Team View',
        type: ProjectViewType.TEAM,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'team',
        order: 6,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.ACTIVITY]: ProjectViewEntity.create({
        name: 'Activity View',
        type: ProjectViewType.ACTIVITY,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'activity',
        order: 7,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.DASHBOARD]: ProjectViewEntity.create({
        name: 'Dashboard View',
        type: ProjectViewType.DASHBOARD,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'dashboard',
        order: 8,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
      [ProjectViewType.GRID]: ProjectViewEntity.create({
        name: 'Grid View',
        type: ProjectViewType.GRID,
        projectId,
        createdBy,
        onlyMe: false,
        icon: 'grid',
        order: 9,
        data: {
          date: 'this-month',
          priority: 'ALL',
          point: -1,
          groupBy: 'STATUS',
          statusIds: ['ALL'],
          assigneeIds: ['ME'],
        },
      }),
    }

    return viewTypes.map((viewType, index) => {
      const template = viewTemplates[viewType]
      if (members && members.length > 0) {
        template.data.assigneeIds = members
      }
      return {
        ...template,
        order: index + 1, // Set order based on array position
      }
    })
  }
}
