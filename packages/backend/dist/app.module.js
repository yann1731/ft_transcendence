"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const chatroom_module_1 = require("./chatroom/chatroom.module");
const chatroomuser_module_1 = require("./chatroomuser/chatroomuser.module");
const privatemessage_module_1 = require("./privatemessage/privatemessage.module");
const chatroommessage_module_1 = require("./chatroommessage/chatroommessage.module");
const userfriendship_module_1 = require("./userfriendship/userfriendship.module");
const userblocks_module_1 = require("./userblocks/userblocks.module");
const chat_module_1 = require("./chat/chat.module");
const auth_module_1 = require("./auth/auth.module");
const game_module_1 = require("./gameSocket/game.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, chatroom_module_1.ChatroomModule, chatroomuser_module_1.ChatroomuserModule, privatemessage_module_1.PrivatemessageModule, chatroommessage_module_1.ChatroommessageModule, userfriendship_module_1.UserfriendshipModule, userblocks_module_1.UserblocksModule, chat_module_1.ChatModule, auth_module_1.AuthModule, game_module_1.GameModule,
            serve_static_1.ServeStaticModule.forRoot({ rootPath: (0, path_1.join)(__dirname, '..', 'build') })]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map