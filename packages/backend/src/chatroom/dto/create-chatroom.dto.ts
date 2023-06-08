import { User, chatRoomState } from "@prisma/client";

export class CreateChatroomDto {
    state: chatRoomState;
    userId: string;
    password?: string;
}
