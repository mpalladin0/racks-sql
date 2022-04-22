import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    createAccount(user_uuid: string, createAccountDto: CreateAccountDto): Promise<any>;
    findAll(user_uuid: string): Promise<any>;
    deleteAllAccounts(user_uuid: string): Promise<import("./models/account.model").AccountModel[]>;
    deleteAccountByAccountUUID(user_uuid: string, account_uuid: string): Promise<any>;
}
