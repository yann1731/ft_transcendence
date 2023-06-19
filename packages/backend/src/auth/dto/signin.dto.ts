import { IsEmail, IsString, MinLength } from "class-validator";

export class signinDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
    
    @IsEmail()
    email: string;
}