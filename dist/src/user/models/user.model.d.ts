import { Model } from "sequelize-typescript";
import { AccountModel } from "src/accounts/models/account.model";
import { ApplicationModel } from "src/applications/application.model";
import { Profile } from "src/profile/models/profile.model";
export declare class User extends Model {
    uuid: string;
    email: string;
    password: string;
    unit_id: number;
    profile: Profile[];
    applications: ApplicationModel[];
    accounts: AccountModel[];
}
