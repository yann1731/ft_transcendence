import { userPermission } from "@prisma/client";

export class CreateChatroomuserDto {
    userId: string;
    chatroomId: string;
    permission: userPermission;
}
