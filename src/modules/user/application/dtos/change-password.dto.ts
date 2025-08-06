import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    type: String,
    example: 'currentPassword123',
  })
  @IsString()
  @MinLength(6)
  currentPassword: string

  @ApiProperty({
    description: 'New password',
    type: String,
    example: 'newPassword123',
  })
  @IsString()
  @MinLength(6)
  newPassword: string

  @ApiProperty({
    description: 'Confirm new password',
    type: String,
    example: 'newPassword123',
  })
  @IsString()
  @MinLength(6)
  confirmPassword: string
}
