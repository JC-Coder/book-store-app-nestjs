import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}


    // create new user 
    async create(requestPayload): Promise<User>{
        const user = await this.userRepository.create({
            username: requestPayload.username,
            password: requestPayload.password
        })
        
        return await this.userRepository.save(user);
    }

    
    // find user by username 
    async findOne(username): Promise<User>{
        return await this.userRepository.findOne({
            where: {username: username}
        })
    }
}
