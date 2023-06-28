import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { onlineStatus } from '@prisma/client';
import { IsString, IsEmail, MinLength, IsNumber, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    avatar?: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    username?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    nickname?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNumber()
    win?: number;

    @IsOptional()
    @IsNumber()
    loss?: number;

    @IsOptional()
    @IsNumber()
    gamesPlayed?: number;

    @IsOptional()
    @IsEnum(onlineStatus)
    userStatus?: onlineStatus;

    @IsOptional()
    @IsBoolean()
    twoFaEnabled?: boolean;

    @IsOptional()
    @IsString()
    refresh_token?: string;
}
