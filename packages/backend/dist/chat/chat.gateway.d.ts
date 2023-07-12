import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    constructor(chatService: ChatService);
    server: Server;
    handleConnection(socket: Socket): void;
    handleDisconnect(): void;
    handleTest(client: Socket, data: any): void;
    createChannel(client: Socket, data: any): Promise<void>;
}
