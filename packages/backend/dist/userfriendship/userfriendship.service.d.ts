import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserfriendshipService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserfriendshipDto: CreateUserfriendshipDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userAId: string;
        userBId: string;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userAId: string;
        userBId: string;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userAId: string;
        userBId: string;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userAId: string;
        userBId: string;
    }, unknown> & {}>;
}
