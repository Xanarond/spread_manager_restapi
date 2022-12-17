import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Spread Manager RESTAPI')
    .setDescription('The Spread Manager API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
  app.enableCors(corsOptions);

  await app.listen(process.env.SERVER_PORT, process.env.HTTPHOST);
}
bootstrap();
