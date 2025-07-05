import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { ValidationError } from 'class-validator'

import { AppModule } from './app.module'
import { AllExceptionsFilter } from './shared/common/filters/all-exceptions.filter'
import { ResponseInterceptor } from './shared/common/interceptors/response.interceptor'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove fields not in DTO
      forbidNonWhitelisted: true, // Throw error if extra fields
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit conversion for primitive types
      },
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]): never => {
        const firstError = errors[0]
        const firstConstraint = Object.values(firstError.constraints || {})[0]

        const validationError = {
          field: firstError.property,
          message: firstConstraint,
          value: firstError.value,
        }

        throw new HttpException(
          {
            message: 'Validation failed',
            error: 'VALIDATION_ERROR',
            validationError,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        )
      },
    }),
  )

  // Global filters and interceptors
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())

  const config = new DocumentBuilder()
    .setTitle('ToiDiLam API')
    .setDescription('Work and team performance management system API documentation')
    .setVersion('1.0')
    .addTag('ToiDiLam')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT access token',
      in: 'header',
    })
    .build()

  const document = (): OpenAPIObject => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT)

  console.log(`🚀 Server is running at: http://localhost:${PORT}`)
  console.log(`� Swagger documentation available at: http://localhost:${PORT}/docs`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
}

void bootstrap()
