import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatroomuserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChatroomuserDto: CreateChatroomuserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {}>;
    update(id: string, updateChatroomuserDto: UpdateChatroomuserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {}>;
}
