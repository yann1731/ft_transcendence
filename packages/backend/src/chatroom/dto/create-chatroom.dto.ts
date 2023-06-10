import { User, chatRoomState } from "@prisma/client";

export class CreateChatroomDto {
    chatroomOwner: User;
    state: chatRoomState;
    userId: string;
    password?: string;
}
