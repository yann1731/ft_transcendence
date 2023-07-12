import { userPermission } from '@prisma/client';
export declare class UpdateChatroomuserDto {
    permission?: userPermission;
    banStatus?: boolean;
    banUntil?: Date | null;
    muteStatus?: boolean;
}
