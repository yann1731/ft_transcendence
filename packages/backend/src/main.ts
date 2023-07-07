import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(4242);
}
bootstrap();