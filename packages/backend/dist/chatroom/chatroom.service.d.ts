import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePasswordChatroomDto } from './dto/create-passwordChatroom.dto';
import { userPermission } from '@prisma/client';
export declare class ChatroomService {
    private prisma;
    constructor(prisma: PrismaService);
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
        permission: userPermission;
        banStatus: boolean;
        banUntil: Date;
        muteStatus: boolean;
    }, unknown> & {})[]>;
    update(name: string, updateChatroomDto: UpdateChatroomDto): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
    remove(name: string): Promise<import("@prisma/client/runtime").GetResult<{
        name: string;
        id: string;
        picture: string;
        state: import(".prisma/client").chatRoomState;
        userId: string;
        password: string;
    }, unknown> & {}>;
}
