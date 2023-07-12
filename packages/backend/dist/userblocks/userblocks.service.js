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
exports.UserblocksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserblocksService = exports.UserblocksService = class UserblocksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserblockDto) {
        const userblocks = await this.prisma.userBlocks.create({ data: {
                blocker: {
                    connect: {
                        id: createUserblockDto.blockerId
                    }
                },
                blockedUser: {
                    connect: {
                        id: createUserblockDto.blockedUserId
                    }
                }
            } });
        if (!userblocks)
            throw new common_1.BadRequestException;
        else
            return userblocks;
    }
    async findAll() {
        return await this.prisma.userBlocks.findMany();
    }
    async findOne(id) {
        const userblocks = await this.prisma.userBlocks.findUnique({ where: { id }
        });
        if (!userblocks)
            throw new common_1.BadRequestException;
        else
            return userblocks;
    }
    async remove(id) {
        const userblocks = await this.prisma.userBlocks.delete({ where: { id }
        });
        if (!userblocks)
            throw new common_1.BadRequestException;
        else
            return userblocks;
    }
};
exports.UserblocksService = UserblocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserblocksService);
//# sourceMappingURL=userblocks.service.js.map