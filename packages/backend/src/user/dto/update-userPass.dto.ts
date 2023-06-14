import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { onlineStatus } from '@prisma/client';
import { IsString, IsEmail, MinLength, Min, IsNumber, IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPassDto extends PartialType(CreateUserDto) {
    @IsString()
    @MinLength(8)
    password: string;
}
