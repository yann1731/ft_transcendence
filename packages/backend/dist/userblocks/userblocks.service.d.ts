import { CreateUserblockDto } from './dto/create-userblock.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserblocksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserblockDto: CreateUserblockDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        blockerId: string;
        blockedUserId: string;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        blockerId: string;
        blockedUserId: string;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        blockerId: string;
        blockedUserId: string;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        blockerId: string;
        blockedUserId: string;
    }, unknown> & {}>;
}
