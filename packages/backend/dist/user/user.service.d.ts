import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(code: string, refresh_token: string, expires_in: number, created_at: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        avatar: string;
        username: string;
        nickname: string;
        token: string;
        token_created_at: number;
        token_expires_at: number;
        refresh_token: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: import(".prisma/client").onlineStatus;
        twoFaEnabled: boolean;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        avatar: string;
        username: string;
        nickname: string;
        token: string;
        token_created_at: number;
        token_expires_at: number;
        refresh_token: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: import(".prisma/client").onlineStatus;
        twoFaEnabled: boolean;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        avatar: string;
        username: string;
        nickname: string;
        token: string;
        token_created_at: number;
        token_expires_at: number;
        refresh_token: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: import(".prisma/client").onlineStatus;
        twoFaEnabled: boolean;
    }, unknown> & {}>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        avatar: string;
        username: string;
        nickname: string;
        token: string;
        token_created_at: number;
        token_expires_at: number;
        refresh_token: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: import(".prisma/client").onlineStatus;
        twoFaEnabled: boolean;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        avatar: string;
        username: string;
        nickname: string;
        token: string;
        token_created_at: number;
        token_expires_at: number;
        refresh_token: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: import(".prisma/client").onlineStatus;
        twoFaEnabled: boolean;
    }, unknown> & {}>;
}
