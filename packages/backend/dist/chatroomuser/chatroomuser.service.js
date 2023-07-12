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
exports.ChatroomuserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChatroomuserService = exports.ChatroomuserService = class ChatroomuserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChatroomuserDto) {
        const chatroomuser = await this.prisma.chatroomUser.create({ data: {
                user: {
                    connect: {
                        id: createChatroomuserDto.userId
                    }
                },
                chatroom: {
                    connect: {
                        id: createChatroomuserDto.chatroomId
                    }
                }
            }
        });
        if (!chatroomuser)
            throw new common_1.BadRequestException;
        else
            return chatroomuser;
    }
    async findAll() {
        return await this.prisma.chatroomUser.findMany();
    }
    async findOne(id) {
        const chatroomuser = await this.prisma.chatroomUser.findUnique({ where: { id }
        });
        if (!chatroomuser)
            throw new common_1.BadRequestException;
        else
            return chatroomuser;
    }
    async update(id, updateChatroomuserDto) {
        const chatroomuser = await this.prisma.chatroomUser.update({ where: { id },
            data: {
                permission: updateChatroomuserDto.permission,
                banStatus: updateChatroomuserDto.banStatus,
                banUntil: updateChatroomuserDto.banUntil,
                muteStatus: updateChatroomuserDto.muteStatus
            }
        });
        if (!chatroomuser)
            throw new common_1.BadRequestException;
        else
            return chatroomuser;
    }
    async remove(id) {
        const chatroomuser = await this.prisma.chatroomUser.delete({ where: { id }
        });
        if (!chatroomuser)
            throw new common_1.BadRequestException;
        else
            return chatroomuser;
    }
};
exports.ChatroomuserService = ChatroomuserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatroomuserService);
//# sourceMappingURL=chatroomuser.service.js.map