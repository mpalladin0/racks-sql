import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { DepositProductModel } from "./deposit_product.model";
declare type StatusTypes = 'OPEN' | 'CLOSED' | 'FROZEN' | 'PENDING';
declare type CurrencyTypes = 'USD';
export declare class AccountModel extends Model {
    private static unit;
    static fetchStatus(Account: AccountModel): Promise<void>;
    account_uuid: string;
    user_uuid: string;
    user: User;
    deposit_product: DepositProductModel[];
    status: string;
    currency: string;
    balance: number;
    hold: number;
    available: number;
    routing_number: string;
    account_number: string;
}
export type { StatusTypes as AccountStatusTypes };
export type { CurrencyTypes as AccountCurrencyTypes };
