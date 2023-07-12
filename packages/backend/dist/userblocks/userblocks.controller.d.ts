import { UserblocksService } from './userblocks.service';
import { CreateUserblockDto } from './dto/create-userblock.dto';
export declare class UserblocksController {
    private readonly userblocksService;
    constructor(userblocksService: UserblocksService);
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
