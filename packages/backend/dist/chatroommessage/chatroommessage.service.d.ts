import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatroommessageService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(chatroomId: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        content: string;
        createdAt: Date;
        senderId: string;
        chatroomId: string;
    }, unknown> & {})[]>;
}
