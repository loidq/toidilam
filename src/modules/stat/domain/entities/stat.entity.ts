export interface IStatData {
  [key: string]: any
}

export interface IStatConstructorParams {
  id?: string
  type: string
  data?: IStatData
  userId?: string
  projectId: string
  organizationId?: string
  year: number
  month: number
  date: number
  updatedAt?: Date
}

export class StatEntity {
  public readonly id?: string
  public readonly type: string
  public readonly data?: IStatData
  public readonly userId?: string
  public readonly projectId: string
  public readonly organizationId?: string
  public readonly year: number
  public readonly month: number
  public readonly date: number
  public readonly updatedAt?: Date

  constructor(params: IStatConstructorParams) {
    this.id = params.id
    this.type = params.type
    this.data = params.data
    this.userId = params.userId
    this.projectId = params.projectId
    this.organizationId = params.organizationId
    this.year = params.year
    this.month = params.month
    this.date = params.date
    this.updatedAt = params.updatedAt
  }

  // Helper methods for date handling
  public getDateString(): string {
    return `${this.year}-${this.month.toString().padStart(2, '0')}-${this.date.toString().padStart(2, '0')}`
  }

  public isToday(): boolean {
    const today = new Date()
    return (
      this.year === today.getFullYear() &&
      this.month === today.getMonth() + 1 &&
      this.date === today.getDate()
    )
  }

  public isThisMonth(): boolean {
    const today = new Date()
    return this.year === today.getFullYear() && this.month === today.getMonth() + 1
  }

  public isThisYear(): boolean {
    const today = new Date()
    return this.year === today.getFullYear()
  }
}
