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
exports.UserfriendshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserfriendshipService = exports.UserfriendshipService = class UserfriendshipService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserfriendshipDto) {
        const userfriendship = await this.prisma.userFriendship.create({
            data: {
                userA: {
                    connect: {
                        id: createUserfriendshipDto.userAId
                    }
                },
                userB: {
                    connect: {
                        id: createUserfriendshipDto.userBId
                    }
                }
            }
        });
        if (!userfriendship)
            throw new common_1.BadRequestException;
        else
            return userfriendship;
    }
    async findAll() {
        const userfriendship = await this.prisma.userFriendship.findMany();
        if (!userfriendship)
            throw new common_1.BadRequestException;
        else
            return userfriendship;
    }
    async findOne(id) {
        const userfriendship = await this.prisma.userFriendship.findUnique({ where: { id } });
        if (!userfriendship)
            throw new common_1.BadRequestException;
        else
            return userfriendship;
    }
    async remove(id) {
        return await this.prisma.userFriendship.delete({ where: { id } });
    }
};
exports.UserfriendshipService = UserfriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserfriendshipService);
//# sourceMappingURL=userfriendship.service.js.map