import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookName: string;

    @Column()
    authorName: string;

    @Column()
    publishYear: number;

    @Column({ default: true})
    isAvailable: boolean;

    @Column()
    ownerId: number;

    @Column({ default: ''})
    bookImageUrl: string

    @Column({ default: ''})
    bookImageOriginalName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

