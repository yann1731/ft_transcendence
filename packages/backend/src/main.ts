import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from "cors"
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: string = process.env.BACKEND_PORT

  app.use(cors())
  app.enableCors({
    origin: '*',
    methods: '*',
  });
  
  const bodyParser = require('body-parser');
  const config = new DocumentBuilder()
  .setTitle("Median")
  .setDescription("The Median API")
  .setVersion('0.1')
  .addBearerAuth()
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(cookieParser())  
  await app.listen(port);
}
bootstrap();