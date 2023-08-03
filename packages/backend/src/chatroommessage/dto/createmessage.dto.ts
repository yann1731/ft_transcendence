import { Chatroom, User } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreateChatroomMessageDto {
    content: string;
    senderId: string;
    chatroomId: string;
}