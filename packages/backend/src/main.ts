import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from "cors"
import { adapter } from './websocketAdapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from "socket.io-redis"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
/*   const redisIoAdapter = new adapter(app);
  await redisIoAdapter.connectToRedis(); */

  app.useWebSocketAdapter(new IoAdapter(app));

/*   const redis = redisIoAdapter({});
  app.useWebSocketAdapter(new IoAdapter(app, {adapter: redis})) */

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