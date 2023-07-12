import { chatRoomState } from "@prisma/client";
export declare class CreatePasswordChatroomDto {
    name: string;
    picture: string;
    state: chatRoomState;
    userId: string;
    password: string;
}
