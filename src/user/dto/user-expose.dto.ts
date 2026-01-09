import { Exclude, Expose } from "class-transformer";
import { Borrowing } from "src/borrowing/entities/borrowing.entity";

export class ExposeDto {
    @Expose()
    email: string

    @Expose()
    role: 'STUDENT'|'LIBRARIAN'|'ADMIN'

    @Expose()
    borrowings: Borrowing[]

    @Expose()
    surname: string

    @Expose()
    lastname: string

    @Exclude()
    id: number;

    @Exclude()
    password: string
}