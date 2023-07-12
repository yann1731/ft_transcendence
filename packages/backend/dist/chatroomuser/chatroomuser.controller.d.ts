import { ChatroomuserService } from './chatroomuser.service';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';
export declare class ChatroomuserController {
    private readonly chatroomuserService;
    constructor(chatroomuserService: ChatroomuserService);
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
