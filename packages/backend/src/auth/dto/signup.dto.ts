import { IsEmail, IsString, MinLength } from "class-validator";

export class signupDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsString()
    @MinLength(8)
    password: string;
    
    @IsEmail()
    email: string;
}