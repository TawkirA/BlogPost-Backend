import { IsString, IsEmail } from "class-validator";
// import { IsEmail } from "sequelize-typescript";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}