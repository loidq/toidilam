export interface IApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: IApiError
  meta?: IApiMeta
  timestamp: string
  path: string
}

export interface IApiError {
  code: string
  message: string
  details?: any
  validationError?: IValidationError
}

export interface IApiMeta {
  pagination?: IPaginationMeta
  total?: number
  page?: number
  limit?: number
}

export interface IPaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface IValidationError {
  field: string
  message: string
  value?: any
}
