import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    async setPassword(password: string){
        const salt = await bcrypt.genSalt();
        let hashPass = await bcrypt.hash(password || this.password, salt);
        this.password = hashPass;
    }
}