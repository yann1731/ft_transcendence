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
exports.UserfriendshipController = void 0;
const common_1 = require("@nestjs/common");
const userfriendship_service_1 = require("./userfriendship.service");
const create_userfriendship_dto_1 = require("./dto/create-userfriendship.dto");
let UserfriendshipController = exports.UserfriendshipController = class UserfriendshipController {
    constructor(userfriendshipService) {
        this.userfriendshipService = userfriendshipService;
    }
    create(createUserfriendshipDto) {
        return this.userfriendshipService.create(createUserfriendshipDto);
    }
    findAll() {
        return this.userfriendshipService.findAll();
    }
    findOne(id) {
        return this.userfriendshipService.findOne(id);
    }
    remove(id) {
        return this.userfriendshipService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_userfriendship_dto_1.CreateUserfriendshipDto]),
    __metadata("design:returntype", void 0)
], UserfriendshipController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserfriendshipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserfriendshipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserfriendshipController.prototype, "remove", null);
exports.UserfriendshipController = UserfriendshipController = __decorate([
    (0, common_1.Controller)('userfriendship'),
    __metadata("design:paramtypes", [userfriendship_service_1.UserfriendshipService])
], UserfriendshipController);
//# sourceMappingURL=userfriendship.controller.js.map