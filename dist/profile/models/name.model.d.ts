import { Model } from "sequelize-typescript";
import { Profile } from "./profile.model";
export declare class Name extends Model {
    name_uuid: string;
    first: string;
    middle: string;
    last: string;
    profile_uuid: String;
    user: Profile;
}
