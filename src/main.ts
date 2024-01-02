import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['userid']
  }))
  app.enableCors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: false,
    maxAge: 3600
  });
  // swagger setup
  const swaggerConfig = new DocumentBuilder()
            .setTitle('NestJS API')
            .setDescription('The Nest Rest API. API description the crud operation for user models')
            .setVersion('1.0')
            .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)         

  await app.listen(3001);
}
bootstrap();
