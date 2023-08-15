import { userPermission } from "@prisma/client";

export class CreateChatroomuserDto {
    userId: string;
    userName: string;
    chatroomId: string;
    permission: userPermission;
}
