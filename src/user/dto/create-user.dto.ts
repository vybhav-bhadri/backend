import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto{
   
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}