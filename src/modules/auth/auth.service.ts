import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    

    // validate user 
    async validateUser(username: string, password: string): Promise<any>{
        const user = await this.userService.findOne(username);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(user && passwordMatch){
            const {password, ...result} = user;

            return result;
        }

        throw new UnauthorizedException();
    }


    // login user and generate jwt token 
    async login(user: any){
        const payload = {username: user.username, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
