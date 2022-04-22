import { Model } from "sequelize-typescript";
import { Profile } from "./profile.model";
export declare class Name extends Model {
    profileId: number;
    profile: Profile;
    first: string;
    middle: string;
    last: string;
}
