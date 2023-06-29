import { User, chatRoomState } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreateChatroomDto {
    name: string;
    picture: string;
    state?: chatRoomState;
    userId: string;
}
