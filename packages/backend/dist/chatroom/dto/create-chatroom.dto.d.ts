import { chatRoomState } from "@prisma/client";
export declare class CreateChatroomDto {
    name: string;
    picture: string;
    state?: chatRoomState;
    userId: string;
}
