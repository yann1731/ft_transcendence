import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
export declare class ChatroomController {
    private readonly chatroomService;
    constructor(chatroomService: ChatroomService);
    createWithPass(createPasswordChatroomDto: CreatePasswordChatroomDto): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
    create(createChatroomDto: CreateChatroomDto): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {})[]>;
    findOne(name: string): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
    findAllUsers(id: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        chatroomId: string;
        permission: import(".prisma/client").userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {})[]>;
    update(id: string, updateChatroomDto: UpdateChatroomDto): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
}
