import { userPermission } from "@prisma/client";

export class CreateChatroomuserDto {
    id: string;
    userId: string;
    userName: string;
    chatroomId: string;
    permission: userPermission;
}
