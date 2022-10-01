import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreateBookDto {

    @IsNotEmpty()
    bookName: string;

    @IsNotEmpty()
    authorName: string;

    @IsNotEmpty()
    publishYear: number;

    @IsNotEmpty()
    isAvailable: boolean;

    @IsNotEmpty()
    ownerId: number;
}