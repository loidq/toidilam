import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'

export class CreateTaskChecklistDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  order: number
}

export class UpdateTaskChecklistDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number

  @IsOptional()
  @IsBoolean()
  done?: boolean
}

export class TaskChecklistListQueryDto {
  @IsOptional()
  @IsString()
  taskId?: string
}

export class TaskChecklistResponseDto {
  id: string
  title: string
  order: number
  taskId: string
  done: boolean
  doneAt?: Date
  createdAt?: Date
  updatedAt?: Date
}
