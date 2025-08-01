import { FieldType } from '../enums/field-type.enum'

export interface IFieldData {
  [key: string]: any
}

export interface IFieldConfig {
  [key: string]: any
}

export class FieldEntity {
  public readonly id?: string
  public projectId: string
  public name: string
  public type: FieldType
  public icon?: string
  public hidden: boolean
  public width: number
  public order: number
  public desc?: string
  public data: IFieldData
  public config: IFieldConfig

  constructor(props: {
    id?: string
    projectId: string
    name: string
    type: FieldType
    icon?: string
    hidden?: boolean
    width: number
    order: number
    desc?: string
    data?: IFieldData
    config?: IFieldConfig
  }) {
    this.id = props.id
    this.projectId = props.projectId
    this.name = props.name
    this.type = props.type
    this.icon = props.icon
    this.hidden = props.hidden || false
    this.width = props.width
    this.order = props.order
    this.desc = props.desc
    this.data = props.data || {}
    this.config = props.config || {}
  }

  static create(data: {
    projectId: string
    name: string
    type: FieldType
    width: number
    order: number
    icon?: string
    hidden?: boolean
    desc?: string
    data?: IFieldData
    config?: IFieldConfig
  }): FieldEntity {
    return new FieldEntity(data)
  }

  update(data: {
    name?: string
    type?: FieldType
    icon?: string
    hidden?: boolean
    width?: number
    order?: number
    desc?: string
    data?: IFieldData
    config?: IFieldConfig
  }): void {
    if (data.name !== undefined) this.name = data.name
    if (data.type !== undefined) this.type = data.type
    if (data.icon !== undefined) this.icon = data.icon
    if (data.hidden !== undefined) this.hidden = data.hidden
    if (data.width !== undefined) this.width = data.width
    if (data.order !== undefined) this.order = data.order
    if (data.desc !== undefined) this.desc = data.desc
    if (data.data !== undefined) this.data = { ...this.data, ...data.data }
    if (data.config !== undefined) this.config = { ...this.config, ...data.config }
  }
}
