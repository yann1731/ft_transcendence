import { PrismaService } from 'src/prisma/prisma.service';
export declare class PrivatemessageService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(senderId: string, recipientId: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        content: string;
        createdAt: Date;
        senderId: string;
        recipientId: string;
    }, unknown> & {})[]>;
}
