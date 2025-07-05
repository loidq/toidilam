import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { IApiResponse, IValidationError } from '../interfaces/api-response.interface'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let code = 'INTERNAL_SERVER_ERROR'
    let details: unknown = null
    let validationError: IValidationError | null = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()

      if (typeof errorResponse === 'object' && errorResponse !== null) {
        const errorObj = errorResponse as any

        // Handle custom validation errors từ main.ts
        if (errorObj.validationError && typeof errorObj.validationError === 'object') {
          validationError = errorObj.validationError
          message = errorObj.message || 'Validation failed'
          code = 'VALIDATION_ERROR'
          details = errorObj.error
        }
        // Handle class-validator default errors
        else if (errorObj.message && Array.isArray(errorObj.message)) {
          validationError = {
            field: 'unknown',
            message: errorObj.message[0],
            value: null,
          }
          message = 'Validation failed'
          code = 'VALIDATION_ERROR'
        }
        // Handle single message
        else {
          message = errorObj.message || exception.message
          code = this.getErrorCode(status)
          details = errorObj.error || errorObj.details
        }
      } else {
        message = errorResponse
        code = this.getErrorCode(status)
      }
    } else if (exception instanceof Error) {
      message = exception.message
      code = 'APPLICATION_ERROR'
      details = process.env.NODE_ENV === 'development' ? exception.stack : undefined
    }

    // Log error
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : exception,
    )

    const errorResponse: IApiResponse = {
      success: false,
      message,
      error: {
        code,
        message,
        details: process.env.NODE_ENV === 'development' ? details : undefined,
        validationError: validationError || undefined,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(status).json(errorResponse)
  }

  private getErrorCode(status: number): string {
    switch (status as HttpStatus) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST'
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED'
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN'
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND'
      case HttpStatus.CONFLICT:
        return 'CONFLICT'
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'VALIDATION_ERROR'
      default:
        return 'INTERNAL_SERVER_ERROR'
    }
  }
}
