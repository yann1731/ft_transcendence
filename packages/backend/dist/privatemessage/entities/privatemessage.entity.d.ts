import { User } from '../../user/entities/user.entity';
export declare class PrivateMessage {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
    sender?: User;
    recipientId: string;
    receiver?: User;
}
