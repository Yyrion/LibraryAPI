import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Borrowing {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ManyToOne(() => User, (user) => user.borrows)
    user: User

    @ManyToOne(() => Book, (book) => book.borrows)
    book: Book

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    borrow_date: Date

    @Column({
        default: () => 'CURRENT_TIMESTAMP'
    })
    deadline_date: Date

    @Column({
        type: 'varchar',
        length: 40,
        default: 'ACTIVE'
    })
    status: 'ACTIVE'|'RETURNED'|'OVERDUE'
}