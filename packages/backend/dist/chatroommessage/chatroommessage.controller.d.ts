import { ChatroommessageService } from './chatroommessage.service';
export declare class ChatroommessageController {
    private readonly chatroommessageService;
    constructor(chatroommessageService: ChatroommessageService);
    findAll(chatroomId: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        content: string;
        createdAt: Date;
        senderId: string;
        chatroomId: string;
    }, unknown> & {})[]>;
}
