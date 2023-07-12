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
exports.PrivatemessageService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PrivatemessageService = exports.PrivatemessageService = class PrivatemessageService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(senderId, recipientId) {
        const messages = await this.prisma.privateMessage.findMany({
            where: {
                OR: [
                    { senderId: senderId, recipientId: recipientId },
                    { senderId: recipientId, recipientId: senderId }
                ],
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        if (!messages)
            throw new common_1.BadRequestException;
        else
            return messages;
    }
};
exports.PrivatemessageService = PrivatemessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrivatemessageService);
//# sourceMappingURL=privatemessage.service.js.map