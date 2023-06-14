import { User, chatRoomState } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreateChatroomDto {
    state?: chatRoomState;
    userId: string;
}
