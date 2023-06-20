import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomuserDto } from './create-chatroomuser.dto';
import { userPermission } from '@prisma/client';

export class UpdateChatroomuserDto extends PartialType(CreateChatroomuserDto) {
    permission?: userPermission;
    banStatus?: boolean;
    banUntil?: Date | null;
    muteStatus?: boolean;
}
