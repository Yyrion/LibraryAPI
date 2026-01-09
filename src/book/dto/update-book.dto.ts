import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @MaxLength(20)
    @IsOptional()
    ISBN: string

    @IsOptional()
    title: string

    @IsOptional()
    author: string

    @IsOptional()
    editor: string

    @IsOptional()
    publication_year: number

    @IsOptional()
    total_amount: number
}
