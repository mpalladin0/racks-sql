import { CreateUserDto } from './dto/create-user.dto';
import { User as UserModel } from './models/user.model';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: typeof UserModel);
    createUser(createUserDto: CreateUserDto): Promise<UserModel>;
    private hashPasswordBeforeCreate;
    findAll(): string;
    findOne(uuid: string): Promise<UserModel>;
    findOneByEmail(email: string): Promise<UserModel>;
}
