import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { onlineStatus } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatar?: string;
    username?: string;
    email?: string;
    win?: number;
    loss?: number;
    gamesPlayed?: number;
    userStatus?: onlineStatus;
    twoFaEnabled?: boolean;
}
