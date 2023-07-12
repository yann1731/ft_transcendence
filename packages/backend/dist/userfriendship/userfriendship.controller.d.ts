import { UserfriendshipService } from './userfriendship.service';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
export declare class UserfriendshipController {
    private readonly userfriendshipService;
    constructor(userfriendshipService: UserfriendshipService);
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
