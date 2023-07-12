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
exports.ChatroomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const { validator } = client_1.Prisma;
let ChatroomService = exports.ChatroomService = class ChatroomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createWithPass(createPasswordChatroomDto) {
        const hashedPass = await argon2.hash(createPasswordChatroomDto.password);
        const defaultPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg';
        const chatroom = await this.prisma.chatroom.create({
            data: {
                chatroomOwner: { connect: { id: createPasswordChatroomDto.userId } },
                name: createPasswordChatroomDto.name,
                picture: createPasswordChatroomDto.picture !== null ? createPasswordChatroomDto.picture : defaultPicture,
                state: createPasswordChatroomDto.state,
                password: hashedPass,
            }
        });
        const chatroomuser = await this.prisma.chatroomUser.create({ data: {
                userId: createPasswordChatroomDto.userId,
                chatroomId: chatroom.id,
                permission: client_2.userPermission.owner
            } });
        if (!chatroom)
            throw new common_1.BadRequestException;
        else
            return chatroom;
    }
    async create(createChatroomDto) {
        const defaultPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg';
        const { name } = createChatroomDto;
        const encodedName = encodeURIComponent(name);
        const chatroom = await this.prisma.chatroom.create({
            data: {
                chatroomOwner: { connect: { id: createChatroomDto.userId } },
                name: encodedName,
                picture: createChatroomDto.picture !== null ? createChatroomDto.picture : defaultPicture,
                state: createChatroomDto.state,
            }
        });
        const chatroomuser = await this.prisma.chatroomUser.create({ data: {
                userId: createChatroomDto.userId,
                chatroomId: chatroom.id,
                permission: client_2.userPermission.owner
            } });
        console.log("picture is : " + createChatroomDto.picture);
        if (!chatroom)
            throw new common_1.BadRequestException('Failed to create chatroom');
        else {
            console.log("created " + createChatroomDto.name);
            console.log("it created " + name);
            return chatroom;
        }
    }
    async findAll() {
        return await this.prisma.chatroom.findMany();
    }
    async findOne(name) {
        const chatroom = await this.prisma.chatroom.findUnique({ where: { name } });
        if (!chatroom)
            throw new common_1.BadRequestException;
        else
            return chatroom;
    }
    async findAllUsers(id) {
        const users = await this.prisma.chatroomUser.findMany({ where: { chatroomId: id } });
        if (!users)
            throw new common_1.BadRequestException;
        else
            return users;
    }
    async update(name, updateChatroomDto) {
        const { state, picture, password } = updateChatroomDto;
        const encodedName = encodeURIComponent(name);
        let updatedPicture = picture;
        if (updatedPicture === null) {
            updatedPicture = 'https://www.zooplus.be/magazine/wp-content/uploads/2019/07/AdobeStock_144559561-768x511.jpeg';
        }
        if (password) {
            const hashedPass = await argon2.hash(updateChatroomDto.password.toString());
            const chatroom = await this.prisma.chatroom.update({ where: {
                    name: encodedName,
                },
                data: {
                    state,
                    picture: updatedPicture,
                    password: hashedPass,
                    users: {
                        create: [updateChatroomDto.users]
                    }
                } });
            if (!chatroom) {
                throw new common_1.BadRequestException;
            }
            else {
                console.log("updated " + name);
                return chatroom;
            }
        }
        else {
            const chatroom = await this.prisma.chatroom.update({ where: {
                    name: encodedName,
                },
                data: {
                    state,
                    picture: updatedPicture,
                    password: null,
                    users: {
                        create: [updateChatroomDto.users]
                    }
                } });
            if (!chatroom)
                throw new common_1.BadRequestException;
            else
                return chatroom;
        }
    }
    async remove(name) {
        const encodedName = encodeURIComponent(name);
        const chatroom = await this.prisma.chatroom.delete({ where: { name: encodedName } });
        if (!chatroom)
            throw new common_1.BadRequestException;
        else
            return chatroom;
    }
};
exports.ChatroomService = ChatroomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatroomService);
//# sourceMappingURL=chatroom.service.js.map