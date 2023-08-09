import { Chatroom, User } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreatePrivateMessageDto {
    content: string;
    senderId: string;
    recipientId: string;
}