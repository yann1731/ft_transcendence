import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomuserDto } from './create-chatroomuser.dto';
import { userPermission } from '@prisma/client';

export class UpdateChatroomuserDto {
    permission?: userPermission;
    banStatus?: boolean;
    muteUntil?: number | null;
    muteStatus?: boolean;
}
