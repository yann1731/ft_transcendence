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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
const axios_1 = require("axios");
let UserService = exports.UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(code, refresh_token, expires_in, created_at) {
        console.log(expires_in);
        console.log(created_at);
        const response = await axios_1.default.get('https://api.intra.42.fr/v2/me', {
            headers: {
                Authorization: `Bearer ${code}`
            }
        });
        const check = await this.prisma.user.findUnique({ where: {
                username: response.data.login
            } });
        if (!check) {
            const user = await this.prisma.user.create({
                data: {
                    email: response.data.email,
                    refresh_token: refresh_token,
                    username: response.data.login,
                    nickname: response.data.login,
                    avatar: response.data.image.link,
                    token: code,
                    token_expires_at: expires_in,
                    token_created_at: created_at
                }
            });
            if (!user) {
                console.log('Error creating user');
                throw new common_1.BadRequestException;
            }
            else
                return user;
        }
        else
            return check;
    }
    async findAll() {
        const user = await this.prisma.user.findMany();
        if (!user)
            throw new common_1.BadRequestException;
        else
            return user;
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.BadRequestException;
        else
            return user;
    }
    async update(id, updateUserDto) {
        const errors = await (0, class_validator_1.validate)(updateUserDto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                avatar: updateUserDto.avatar,
                username: updateUserDto.username,
                nickname: updateUserDto.nickname,
                email: updateUserDto.email,
                win: updateUserDto.win,
                loss: updateUserDto.loss,
                gamesPlayed: updateUserDto.gamesPlayed,
                userStatus: updateUserDto.userStatus,
                twoFaEnabled: updateUserDto.twoFaEnabled,
                refresh_token: updateUserDto.refresh_token,
            }
        });
        if (!user)
            throw new common_1.BadRequestException;
        else
            return user;
    }
    async remove(id) {
        return await this.prisma.user.delete({ where: { id } });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map