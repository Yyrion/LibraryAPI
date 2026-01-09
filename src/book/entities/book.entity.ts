import { Borrowing } from "src/borrowing/entities/borrowing.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

/**
- Identifiant unique
- ISBN (unique)
- Titre, auteur, éditeur
- Année de publication
- Nombre d'exemplaires disponibles (doit être mis à jour automatiquement)
- Nombre total d'exemplaires */

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    ISBN: string

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    editor: string

    @Column()
    publication_year: number

    @Column()
    available_amount: number

    @Column()
    total_amount: number

    @OneToMany(() => Borrowing, (borrow: Borrowing) => borrow.book)
    borrows: Borrowing[]
}