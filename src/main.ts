import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('toidilam API')
    .setDescription('Work and team performance management system')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT access token',
        in: 'header',
      },
      'access-token',
    )
    .build()
  const document = (): OpenAPIObject => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  const PORT = process.env.PORT ?? 3000
  await app.listen(PORT ?? 3000)

  console.log(`🚀 Server is running at: http://localhost:${PORT}`)
  console.log(`📘 Swagger documentation available at: http://localhost:${PORT}/docs`)
}
void bootstrap()
