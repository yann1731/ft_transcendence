import { PrismaService } from "src/prisma/prisma.service";
import { AxiosResponse } from "axios";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    oauthCallback(code: string): Promise<AxiosResponse["data"]>;
    signin(): void;
}
