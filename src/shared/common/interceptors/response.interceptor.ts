import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IApiResponse } from '../interfaces/api-response.interface'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    const request = context.switchToHttp().getRequest()
    const path = request.url

    return next.handle().pipe(
      map(data => {
        // Nếu data đã có format ApiResponse, chỉ thêm timestamp và path
        if (data && typeof data === 'object' && 'success' in data) {
          return {
            ...data,
            timestamp: new Date().toISOString(),
            path,
          } as IApiResponse<T>
        }

        // Nếu chưa có format, wrap lại
        return {
          success: true,
          message: 'Operation successful',
          data,
          timestamp: new Date().toISOString(),
          path,
        } as IApiResponse<T>
      }),
    )
  }
}
