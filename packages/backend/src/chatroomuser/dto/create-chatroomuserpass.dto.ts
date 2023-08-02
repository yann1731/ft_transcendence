import { userPermission } from "@prisma/client";
import { IsString, MinLength } from "class-validator";

export class CreateChatroomuserPassDto {
    userId: string;
    chatroomId: string;
    permission: userPermission;

    @IsString()
    @MinLength(8)
    password: string;
}