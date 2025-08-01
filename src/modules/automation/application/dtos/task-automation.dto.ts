import { IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator'

import { PaginationDto } from '@/shared/common/dtos/pagination.dto'

export class CreateTaskAutomationDto {
  @IsNotEmpty()
  @IsUUID()
  organizationId: string

  @IsNotEmpty()
  @IsUUID()
  projectId: string

  @IsNotEmpty()
  @IsObject()
  when: Record<string, any>

  @IsNotEmpty()
  @IsObject()
  then: Record<string, any>
}

export class UpdateTaskAutomationDto {
  @IsOptional()
  @IsObject()
  when?: Record<string, any>

  @IsOptional()
  @IsObject()
  then?: Record<string, any>
}

export class TaskAutomationListQueryDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  organizationId?: string

  @IsOptional()
  @IsUUID()
  projectId?: string
}
