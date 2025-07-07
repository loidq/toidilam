import { ApiProperty } from '@nestjs/swagger'

export class OrgResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  slug: string

  @ApiProperty({ required: false })
  cover?: string

  @ApiProperty({ required: false })
  avatar?: string

  @ApiProperty({ required: false })
  maxStorageSize?: number

  @ApiProperty({ required: false })
  desc?: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  createdBy: string

  @ApiProperty()
  updatedAt: Date
}

export class OrgsListResponseDto {
  @ApiProperty({ type: [OrgResponseDto] })
  orgs: OrgResponseDto[]

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number
}

export class InvitationResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  organizationId: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  role: string

  @ApiProperty()
  status: string

  @ApiProperty()
  invitedBy: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class UserInvitationsResponseDto {
  @ApiProperty({ type: [InvitationResponseDto] })
  invitations: InvitationResponseDto[]

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number
}
