"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserblocksModule = void 0;
const common_1 = require("@nestjs/common");
const userblocks_service_1 = require("./userblocks.service");
const userblocks_controller_1 = require("./userblocks.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let UserblocksModule = exports.UserblocksModule = class UserblocksModule {
};
exports.UserblocksModule = UserblocksModule = __decorate([
    (0, common_1.Module)({
        controllers: [userblocks_controller_1.UserblocksController],
        providers: [userblocks_service_1.UserblocksService],
        imports: [prisma_module_1.PrismaModule]
    })
], UserblocksModule);
//# sourceMappingURL=userblocks.module.js.map