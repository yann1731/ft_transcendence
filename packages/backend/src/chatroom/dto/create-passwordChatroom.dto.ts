import { User, chatRoomState } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreatePasswordChatroomDto {
    state: chatRoomState;
    userId: string;

    @IsString()
    @MinLength(8)
    password: string;
}