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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async oauthCallback(code) {
        const uid = 'u-s4t2ud-47600cc08a77769cea8bec6cacdd6ef77df4be8fbb4984a8b9435f3cdddee480';
        const secret = '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';
        try {
            const response = await axios_1.default.post('https://api.intra.42.fr/oauth/token', {
                grant_type: 'authorization_code',
                client_id: uid,
                client_secret: secret,
                redirect_uri: 'http://localhost:3000/wait',
                code: code
            });
            console.log('Successfully got token');
            return response.data;
        }
        catch (error) {
            console.error('Failed getting token');
            throw new common_1.BadRequestException('Failed getting token', error);
        }
    }
    signin() {
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map