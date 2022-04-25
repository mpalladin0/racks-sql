import { EventEmitter2 } from '@nestjs/event-emitter';
import { Unit } from '@unit-finance/unit-node-sdk';
import { User } from 'src/user/models/user.model';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountModel } from './models/account.model';
export declare class AccountsService {
    private eventEmitter;
    private readonly userModel;
    private readonly accountModel;
    unit: Unit;
    constructor(eventEmitter: EventEmitter2, userModel: typeof User, accountModel: typeof AccountModel);
    createAccount(user_uuid: string, createAccountDto: CreateAccountDto): Promise<any>;
    findAllByUserUUID(user_uuid: string): Promise<any>;
    deleteAllAccountsByUserUUID(user_uuid: string): Promise<AccountModel[]>;
    deleteAccountByAccountUUID(user_uuid: string, account_uuid: string): Promise<any>;
    handleAccountStatusEvents(): Promise<void>;
}
