import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@WebSocketGateway({ cors: true, namespace: 'chatsocket' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    socket.data.is_client = true;
    console.log("New client [" + socket.id + "] connected to chatSocket");
    console.log("is_client: " + socket.data.is_client);
    // console.log(this.server.sockets);
  }

  handleDisconnect() {
		console.log('Client disconnected from chatSocket');
	}

  @SubscribeMessage("sendMessage")
  handleTest(client: Socket, data: any) {
    console.log("Sending from: " + client.id + " to: " + data.target);
    console.log(client.id, client.rooms);
    this.server.to(data.target).emit("setMessage", data.message);
    // Use the service to interact with the database.
    // this.chatService.create(CreateChatDto);
  }

  @SubscribeMessage("createChannel")
  async createChannel(client: Socket, data:any) {
    console.log("Attempting to create channel");
    const sockets = await this.server.fetchSockets();
    const rooms = sockets.filter((element) => {
      if (element.data.is_client === true) {
        return false;
      }
      return (true);
    });
    rooms.forEach(item => {
      if (data.channelName === item.id) {
        this.server.to(client.id).emit("fail");
      }
    });
    client.join(data.channelName);
    console.log(client.rooms);
  }
}
