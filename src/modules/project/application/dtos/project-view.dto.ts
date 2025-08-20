import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

import { ProjectViewData } from '../../domain/entities/project-view.entity'
import { ProjectViewType } from '../../domain/enums/project-view-type.enum'

export class ProjectViewIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  projectViewId: string
}

export class CreateProjectViewDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsNotEmpty()
  @IsEnum(ProjectViewType)
  type: ProjectViewType

  @IsOptional()
  @IsBoolean()
  onlyMe?: boolean

  @IsOptional()
  @IsString()
  icon?: string

  @IsNotEmpty()
  @IsUUID()
  projectId: string

  @IsOptional()
  @IsNumber()
  order?: number

  @IsOptional()
  @IsObject()
  data?: ProjectViewData
}

export class UpdateProjectViewDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsEnum(ProjectViewType)
  type?: ProjectViewType

  @IsOptional()
  @IsBoolean()
  onlyMe?: boolean

  @IsOptional()
  @IsString()
  icon?: string

  @IsOptional()
  @IsNumber()
  order?: number

  @IsOptional()
  @IsObject()
  data?: ProjectViewData
}

export class ProjectViewResponseDto {
  id: string
  name?: string
  type: ProjectViewType
  onlyMe: boolean
  icon?: string
  projectId: string
  order?: number
  data?: Record<string, any>
  createdAt?: Date
  updatedAt?: Date
  createdBy: string
  updatedBy?: string
}
