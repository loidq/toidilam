import { IsUUID } from 'class-validator'
export class GetOrgQueryDto {
  @IsUUID(7)
  orgId: string
}
