"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = exports.ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
    }
    handleConnection(socket) {
        socket.data.is_client = true;
        console.log("New client [" + socket.id + "] connected to chatSocket");
        console.log("is_client: " + socket.data.is_client);
    }
    handleDisconnect() {
        console.log('Client disconnected from chatSocket');
    }
    handleTest(client, data) {
        console.log("Sending from: " + client.id + " to: " + data.target);
        console.log(client.id, client.rooms);
        this.server.to(data.target).emit("setMessage", data.message);
    }
    async createChannel(client, data) {
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
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendMessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("createChannel"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "createChannel", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, namespace: 'chatsocket' }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map