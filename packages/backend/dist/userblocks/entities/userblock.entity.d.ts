import { User } from '../../user/entities/user.entity';
export declare class UserBlocks {
    blockerId: string;
    blocker?: User;
    blockedUserId: string;
    blockedUser?: User;
    id: string;
}
