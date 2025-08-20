import { ICommand } from '@nestjs/cqrs'

export class SignInCommand implements ICommand {
  public readonly email: string
  public readonly password: string
  constructor(props: { email: string; password: string }) {
    Object.assign(this, props)
  }
}

export class SignUpCommand implements ICommand {
  public readonly email: string
  public readonly password: string
  public readonly name: string
  constructor(props: { email: string; password: string; name: string }) {
    Object.assign(this, props)
  }
}

export class SignOutCommand {
  constructor(public readonly userId: string) {}
}

export class RefreshTokenCommand {
  constructor(public readonly refreshToken: string) {}
}
