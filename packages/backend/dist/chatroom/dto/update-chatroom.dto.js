"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatroomDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_chatroom_dto_1 = require("./create-chatroom.dto");
class UpdateChatroomDto extends (0, mapped_types_1.PartialType)(create_chatroom_dto_1.CreateChatroomDto) {
}
exports.UpdateChatroomDto = UpdateChatroomDto;
//# sourceMappingURL=update-chatroom.dto.js.map