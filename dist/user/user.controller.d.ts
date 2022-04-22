import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(uuid: string): Promise<User>;
}
