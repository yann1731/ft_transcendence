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
exports.ChatroomuserController = void 0;
const common_1 = require("@nestjs/common");
const chatroomuser_service_1 = require("./chatroomuser.service");
const create_chatroomuser_dto_1 = require("./dto/create-chatroomuser.dto");
const update_chatroomuser_dto_1 = require("./dto/update-chatroomuser.dto");
let ChatroomuserController = exports.ChatroomuserController = class ChatroomuserController {
    constructor(chatroomuserService) {
        this.chatroomuserService = chatroomuserService;
    }
    create(createChatroomuserDto) {
        return this.chatroomuserService.create(createChatroomuserDto);
    }
    findAll() {
        return this.chatroomuserService.findAll();
    }
    findOne(id) {
        return this.chatroomuserService.findOne(id);
    }
    update(id, updateChatroomuserDto) {
        return this.chatroomuserService.update(id, updateChatroomuserDto);
    }
    remove(id) {
        return this.chatroomuserService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chatroomuser_dto_1.CreateChatroomuserDto]),
    __metadata("design:returntype", void 0)
], ChatroomuserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatroomuserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatroomuserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_chatroomuser_dto_1.UpdateChatroomuserDto]),
    __metadata("design:returntype", void 0)
], ChatroomuserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatroomuserController.prototype, "remove", null);
exports.ChatroomuserController = ChatroomuserController = __decorate([
    (0, common_1.Controller)('chatroomuser'),
    __metadata("design:paramtypes", [chatroomuser_service_1.ChatroomuserService])
], ChatroomuserController);
//# sourceMappingURL=chatroomuser.controller.js.map