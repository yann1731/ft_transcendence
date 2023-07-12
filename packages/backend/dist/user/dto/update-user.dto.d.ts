import { Chatroom, onlineStatus } from '@prisma/client';
export declare class UpdateUserDto {
    avatar?: string;
    username?: string;
    nickname?: string;
    email?: string;
    win?: number;
    loss?: number;
    gamesPlayed?: number;
    userStatus?: onlineStatus;
    twoFaEnabled?: boolean;
    refresh_token?: string;
    Chatroom?: Chatroom[];
}
