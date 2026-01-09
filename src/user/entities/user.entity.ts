import { Borrowing } from "src/borrowing/entities/borrowing.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    surname:string

    @Column()
    lastname: string

    @Column()
    whiteliststatus: boolean

    @Column()
    creation_date: Date

    @Column()
    modification_date: Date

    @Column({
        type: 'varchar',
        length: 40,
        default: 'STUDENT'
    })
    role: 'STUDENT'|'LIBRARIAN'|'ADMIN'

    @OneToMany(() => Borrowing, (borrow: Borrowing) => borrow.user)
    borrows: Borrowing[]
}
