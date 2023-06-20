import { IsString, IsEmail, MinLength, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    username: string;
    @IsString()
    refresh_token: string;
    @IsEmail()
    email: string;
}
