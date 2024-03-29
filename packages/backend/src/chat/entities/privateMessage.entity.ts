import { User } from "@prisma/client";

export class PrivateMessage {
    id: String;

    content:   String
    createdAt: Date;

    senderId:    String;
    sender:      User;
    recipientId: String;
    receiver:    User;
}