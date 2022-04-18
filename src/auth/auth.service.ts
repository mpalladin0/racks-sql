import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        ) {}

    async validateUser(username: string, pass: string) {
        console.log("Validate user", username, pass)
        const user = await this.usersService.findOneByEmail(username)

        console.log(user.password)

        if (user) {
            const isMatch = await bcrypt.compare(pass, user.password)
        
            if (isMatch) {
                console.log("Passwords match")
                const { password, ...result } = user
                return result;
            } else {
                return null;
            }
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.dataValues.email, sub: user.dataValues.uuid };
        const token = this.jwtService.sign(payload)

        const user_uuid = user.dataValues.uuid;

        console.log("uuid" + user_uuid)
            
        return {
            access_token: token,
            uuid: user_uuid
        }
    }
}
