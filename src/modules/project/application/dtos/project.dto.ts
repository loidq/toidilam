import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsUUID()
  organizationId: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsString()
  cover?: string

  @IsOptional()
  @IsString()
  icon?: string
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  desc?: string

  @IsOptional()
  @IsString()
  cover?: string

  @IsOptional()
  @IsString()
  icon?: string

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean

  @IsOptional()
  @IsBoolean()
  countMemberTask?: boolean

  @IsOptional()
  @IsBoolean()
  countProjectTask?: boolean
}

export class ProjectResponseDto {
  id: string
  name: string
  organizationId: string
  desc?: string
  cover?: string
  icon?: string
  isArchived: boolean
  countMemberTask: boolean
  countProjectTask: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy?: string

  constructor(project: any) {
    this.id = project.id
    this.name = project.name
    this.organizationId = project.organizationId
    this.desc = project.desc
    this.cover = project.cover
    this.icon = project.icon
    this.isArchived = project.isArchived
    this.countMemberTask = project.countMemberTask
    this.countProjectTask = project.countProjectTask
    this.createdAt = project.createdAt
    this.updatedAt = project.updatedAt
    this.createdBy = project.createdBy
    this.updatedBy = project.updatedBy
  }
}

export class ProjectListResponseDto {
  projects: ProjectResponseDto[]
  total: number
  page?: number
  limit?: number

  constructor(projects: any[], total: number, page?: number, limit?: number) {
    this.projects = projects.map(project => new ProjectResponseDto(project))
    this.total = total
    this.page = page
    this.limit = limit
  }
}
