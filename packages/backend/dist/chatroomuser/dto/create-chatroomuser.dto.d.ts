import { userPermission } from "@prisma/client";
export declare class CreateChatroomuserDto {
    userId: string;
    chatroomId: string;
    permission: userPermission;
}
