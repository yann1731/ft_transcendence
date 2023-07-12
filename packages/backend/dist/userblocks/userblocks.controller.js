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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserblocksController = void 0;
const common_1 = require("@nestjs/common");
const userblocks_service_1 = require("./userblocks.service");
const create_userblock_dto_1 = require("./dto/create-userblock.dto");
let UserblocksController = exports.UserblocksController = class UserblocksController {
    constructor(userblocksService) {
        this.userblocksService = userblocksService;
    }
    create(createUserblockDto) {
        return this.userblocksService.create(createUserblockDto);
    }
    findAll() {
        return this.userblocksService.findAll();
    }
    findOne(id) {
        return this.userblocksService.findOne(id);
    }
    remove(id) {
        return this.userblocksService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userblock_dto_1.CreateUserblockDto]),
    __metadata("design:returntype", void 0)
], UserblocksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserblocksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserblocksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserblocksController.prototype, "remove", null);
exports.UserblocksController = UserblocksController = __decorate([
    (0, common_1.Controller)('userblocks'),
    __metadata("design:paramtypes", [userblocks_service_1.UserblocksService])
], UserblocksController);
//# sourceMappingURL=userblocks.controller.js.map