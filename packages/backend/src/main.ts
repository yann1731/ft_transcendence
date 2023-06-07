import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Server } from 'socket.io';

async function bootstrap() {


/*   var express = require('express');
  var test = express();
  var server = require('http').Server(test);
  test.use(express.static(__dirname + '/public'));
  test.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });
  server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
  }); */

/*   var io = require('socket.io')(server); */

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(4000);

  io.on('connection', function (socket){
    console.log("new user");
    socket.on("disconnect", function () {
      console.log("disconnet");
    })
  })


  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Median")
  .setDescription("The Median API")
  .setVersion('0.1')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(4242);
}
bootstrap();


