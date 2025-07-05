# 🚨 Bảng Mapping Lỗi Chuẩn trong NestJS

| STT | HTTP Status (`HttpStatus`)  | Exception Class                          | `error.code`            | `message` mặc định                  | Mô tả / Khi nào dùng                                                |
| --- | --------------------------- | ---------------------------------------- | ----------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| 1   | `400 Bad Request`           | `BadRequestException`                    | `BAD_REQUEST`           | `"Bad request"`                     | Payload sai định dạng, thiếu field, DTO không hợp lệ, query sai...  |
| 2   | `401 Unauthorized`          | `UnauthorizedException`                  | `UNAUTHORIZED`          | `"Unauthorized"`                    | Chưa đăng nhập, token thiếu/sai/hết hạn                             |
| 3   | `403 Forbidden`             | `ForbiddenException`                     | `FORBIDDEN`             | `"Forbidden"`                       | Đã đăng nhập nhưng không có quyền thực hiện hành động               |
| 4   | `404 Not Found`             | `NotFoundException`                      | `NOT_FOUND`             | `"Resource not found"`              | Không tìm thấy dữ liệu (user, task,...)                             |
| 5   | `409 Conflict`              | `ConflictException`                      | `CONFLICT`              | `"Conflict"`                        | Trùng dữ liệu (email, username,...)                                 |
| 6   | `422 Unprocessable Entity`  | `HttpException` (custom)                 | `VALIDATION_ERROR`      | `"Validation failed"`               | Dữ liệu không hợp lệ (qua `ValidationPipe` hoặc kiểm tra nghiệp vụ) |
| 7   | `500 Internal Server Error` | `Error` / `InternalServerErrorException` | `INTERNAL_SERVER_ERROR` | `"Internal server error"`           | Lỗi hệ thống không kiểm soát được                                   |
| 8   | `503 Service Unavailable`   | `ServiceUnavailableException`            | `SERVICE_UNAVAILABLE`   | `"Service temporarily unavailable"` | Service phụ (Redis, DB, 3rd party) ngắt kết nối                     |

---

## ✅ Gợi ý: `ErrorCode` Enum

```ts
export enum ErrorCode {
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}
```

---

## ✅ Hàm map status → code

```ts
export function getErrorCode(status: number): ErrorCode {
  switch (status) {
    case 400:
      return ErrorCode.BAD_REQUEST
    case 401:
      return ErrorCode.UNAUTHORIZED
    case 403:
      return ErrorCode.FORBIDDEN
    case 404:
      return ErrorCode.NOT_FOUND
    case 409:
      return ErrorCode.CONFLICT
    case 422:
      return ErrorCode.VALIDATION_ERROR
    case 503:
      return ErrorCode.SERVICE_UNAVAILABLE
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR
  }
}
```

---

## 🧪 Ví dụ sử dụng

```ts
throw new BadRequestException({
  message: 'Email không hợp lệ',
  error: ErrorCode.BAD_REQUEST,
})
```

```json
{
  "success": false,
  "message": "Email không hợp lệ",
  "error": {
    "code": "BAD_REQUEST",
    "message": "Email không hợp lệ"
  },
  "timestamp": "2025-07-05T10:10:00.000Z",
  "path": "/api/auth/register"
}
```
