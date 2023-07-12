import { PrivatemessageService } from './privatemessage.service';
export declare class PrivatemessageController {
    private readonly privatemessageService;
    constructor(privatemessageService: PrivatemessageService);
    findAll(params: {
        senderId: string;
        recipientId: string;
    }): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        content: string;
        createdAt: Date;
        senderId: string;
        recipientId: string;
    }, unknown> & {})[]>;
}
