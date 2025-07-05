import { Injectable } from '@nestjs/common'

import { IApiMeta, IApiResponse, IValidationError } from '../interfaces/api-response.interface'

@Injectable()
export class ResponseBuilderService {
  success<T>(
    data: T,
    message = 'Operation successful',
    meta?: IApiMeta,
  ): Omit<IApiResponse<T>, 'timestamp' | 'path'> {
    return {
      success: true,
      message,
      data,
      meta,
    }
  }

  error(
    message: string,
    code: string,
    details?: any,
    validationError?: IValidationError,
  ): Omit<IApiResponse, 'timestamp' | 'path'> {
    return {
      success: false,
      message,
      error: {
        code,
        message,
        details,
        validationError,
      },
    }
  }

  created<T>(
    data: T,
    message = 'Resource created successfully',
  ): Omit<IApiResponse<T>, 'timestamp' | 'path'> {
    return this.success(data, message)
  }

  updated<T>(
    data: T,
    message = 'Resource updated successfully',
  ): Omit<IApiResponse<T>, 'timestamp' | 'path'> {
    return this.success(data, message)
  }

  deleted(message = 'Resource deleted successfully'): Omit<IApiResponse, 'timestamp' | 'path'> {
    return this.success(null, message)
  }

  paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Data retrieved successfully',
  ): Omit<IApiResponse<T[]>, 'timestamp' | 'path'> {
    const totalPages = Math.ceil(total / limit)

    return this.success(data, message, {
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
      total,
      page,
      limit,
    })
  }
}
