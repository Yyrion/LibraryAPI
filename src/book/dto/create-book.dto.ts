import { MaxLength } from "class-validator"

export class CreateBookDto {
    @MaxLength(20)
    ISBN: string

    title: string

    author: string

    editor: string

    publication_year: number

    total_amount: number
}
