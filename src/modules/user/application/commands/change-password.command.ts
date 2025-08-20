export class ChangePasswordCommand {
  public readonly userId: string
  public readonly currentPassword: string
  public readonly newPassword: string
  public readonly confirmPassword: string
  constructor({
    userId,
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    userId: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }) {
    this.userId = userId
    this.currentPassword = currentPassword
    this.newPassword = newPassword
    this.confirmPassword = confirmPassword
  }
}
