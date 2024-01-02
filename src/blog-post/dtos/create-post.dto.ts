import { isString, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    tags: string;

    @IsString()
    createdBy: string;
}