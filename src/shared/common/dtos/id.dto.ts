import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'
export abstract class BaseIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  id: string
}
export class ProjectIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  @ApiProperty()
  projectId: string
}
export class ProjectViewIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  projectViewId: string
}
export class UserIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  userId: string
}
export class TaskIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  taskId: string
}

export class CommentIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  commentId: string
}

export class OrganizationIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  organizationId: string
}

export class OrgMemberIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  orgMemberId: string
}

export class MemberIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  @ApiProperty()
  memberId: string
}

export class TaskAutomationIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  taskAutomationId: string
}

export class DashboardIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  @ApiProperty()
  dashboardId: string
}

export class DashboardComponentIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  @ApiProperty()
  dashboardComponentId: string
}

export class FavoriteIdDto {
  @IsNotEmpty()
  @IsUUID(7)
  favoriteId: string
}
