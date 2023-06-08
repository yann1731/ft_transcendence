import { IsString, IsEmail, MinLength, Min } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    username: string;
    @IsString()
    @MinLength(8)
    password: string;
    @IsEmail()
    email: string;
}
