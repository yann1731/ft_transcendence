import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { onlineStatus } from '@prisma/client';
import { IsString, IsEmail, MinLength, Min, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    avatar?: string;

    @IsString()
    @MinLength(4)
    username?: string;

    @IsString()
    @MinLength(8)
    password?: string;

    @IsString()
    @IsEmail()
    email?: string;

    @IsNumber()
    win?: number;

    @IsNumber()
    loss?: number;

    @IsNumber()
    gamesPlayed?: number;

    @IsEnum(onlineStatus)
    userStatus?: onlineStatus;

    @IsBoolean()
    twoFaEnabled?: boolean;
}
