import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}


    // create new user 
    @Post('/register')
    async create(@Body() requestPayload: CreateUserDto): Promise<User>{
        return await this.userService.create(requestPayload)
    }

    // find one by username
    @Get('/:username')
    async findOne(@Param('username') username: string): Promise<User>{
        return this.userService.findOne(username)
    }
}
