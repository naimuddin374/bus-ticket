import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config(); // This loads the environment variables from the .env file



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4002; // Use the PORT from environment variables, default to 3000 if not set

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    // Automatically strip non-whitelisted properties
    forbidNonWhitelisted: true, // Throw errors when non-whitelisted values are provided
    transform: true,    // Automatically transform payloads to match DTO classes
    disableErrorMessages: false, // Show detailed error messages
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('eTicket API')
    .setDescription('The eTicket API description')
    .setVersion('1.0')
    .addTag('eTicket')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port); // Use the port from the environment variable
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
