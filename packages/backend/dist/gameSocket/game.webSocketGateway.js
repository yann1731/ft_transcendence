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
exports.gameSocket = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let gameSocket = exports.gameSocket = class gameSocket {
    constructor() {
        this.numberOfGame = 1;
        this.oneHost = [];
        this.oneWaiting = [];
        this.twoHost = [];
        this.twoWaiting = [];
        this.threeHost = [];
        this.threeWaiting = [];
        this.XVelocityMin1 = 350;
        this.XVelocityMax1 = 400;
        this.XVelocityMin2 = -350;
        this.XVelocityMax2 = -400;
        this.YvelocityMin = 125;
        this.YvelocityMax = 225;
    }
    handleConnection() {
        console.log('New client connected to gameSocket');
    }
    handleDisconnect() {
        console.log('Client disconnected from gameSocket');
    }
    handleMovement(client, newpos) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(String(room[0])).emit("movement", newpos);
    }
    handlePoint(client, which) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(String(room[0])).emit("point", which);
    }
    handleUpdate(client, data) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(String(room[0])).emit("update", { x: data.x, y: data.y });
    }
    handleMulti(client, data) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(String(room[0])).emit("multi", data);
    }
    HandleNewPower(client, data) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(room[0]).emit("newPower", data);
    }
    handleRandom(client, data) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(room[0]).emit("random", data);
    }
    handlePower(client, data) {
        const room = Array.from(client.rooms).filter(room => room !== client.id);
        client.broadcast.to(room[0]).emit("power", data);
    }
    handle1v1(client, data) {
        if (data.start) {
            client.join(data.name);
            if (this.oneWaiting.length >= 1) {
                let opponent = this.oneWaiting.shift();
                opponent.join(data.name);
                if (Math.floor(Math.random() * 2) === 0) {
                    this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                else {
                    this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                this.server.in(data.name).emit("start", { ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face });
            }
            else {
                this.oneHost.push([data.name, data.wall, data.random, data.power, data.face]);
            }
        }
        else {
            if (this.oneHost.length >= 1) {
                let host = this.oneHost.shift();
                client.join(host[0]);
                if (Math.floor(Math.random() * 2) === 0) {
                    this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                else {
                    this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                this.server.in(host[0]).emit("start", { ballX: this.x, ballY: this.y, wall: host[1], random: host[2], power: host[3], face: host[4] });
            }
            else
                this.oneWaiting.push(client);
        }
    }
    handle2v2(client, data) {
        if (data.start) {
            client.join(data.name);
            if (this.twoWaiting.length >= 3) {
                let opponent1 = this.twoWaiting.shift();
                let opponent2 = this.twoWaiting.shift();
                let opponent3 = this.twoWaiting.shift();
                opponent1.join(data.name);
                opponent2.join(data.name);
                opponent3.join(data.name);
                if (Math.floor(Math.random() * 2) === 0) {
                    this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                else {
                    this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                this.server.to(client.id).emit("player", 1);
                this.server.to(opponent1.id).emit("player", 2);
                this.server.to(opponent2.id).emit("player", 3);
                this.server.to(opponent3.id).emit("player", 4);
                this.server.in(data.name).emit("start", { ballX: this.x, ballY: this.y, wall: data.wall, random: data.random, power: data.power, face: data.face });
            }
            else {
                this.twoHost.push([client, data.name, data.wall, data.random, data.power, data.face]);
            }
        }
        else {
            if (this.twoHost.length >= 1 && this.twoWaiting.length >= 2) {
                let host = this.twoHost.shift();
                let opponent1 = this.twoWaiting.shift();
                let opponent2 = this.twoWaiting.shift();
                opponent1.join(host[1]);
                opponent2.join(host[1]);
                client.join(host[1]);
                if (Math.floor(Math.random() * 2) === 0) {
                    this.x = Math.random() * (this.XVelocityMax1 - this.XVelocityMin1) + this.XVelocityMin1;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                else {
                    this.x = Math.random() * (this.XVelocityMax2 - this.XVelocityMin2) + this.XVelocityMin2;
                    this.y = Math.random() * (this.YvelocityMax - this.YvelocityMin) + this.YvelocityMin;
                    if (Math.floor(Math.random() * 2) === 0)
                        this.y *= -1;
                }
                this.server.to(host[0].id).emit("player", 1);
                this.server.to(client.id).emit("player", 2);
                this.server.to(opponent1.id).emit("player", 3);
                this.server.to(opponent2.id).emit("player", 4);
                this.server.in(host[1]).emit("start", { ballX: this.x, ballY: this.y, wall: host[2], random: host[3], power: host[4], face: host[5] });
            }
            else
                this.twoWaiting.push(client);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], gameSocket.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("movement"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handleMovement", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("point"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handlePoint", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handleUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("multi"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handleMulti", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("newPower"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "HandleNewPower", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("random"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handleRandom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("power"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handlePower", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("1v1"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handle1v1", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("2v2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], gameSocket.prototype, "handle2v2", null);
exports.gameSocket = gameSocket = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true, namespace: 'game' })
], gameSocket);
//# sourceMappingURL=game.webSocketGateway.js.map