import { Model } from "sequelize-typescript";
import { AccountModel } from "src/accounts/models/account.model";
import { Application } from "src/applications/models/application.model";
import { Profile } from "src/profile/models/profile.model";
export declare class User extends Model {
    uuid: string;
    email: string;
    password: string;
    unit_id: number;
    profile: Profile[];
    applications: Application[];
    accounts: AccountModel[];
}
