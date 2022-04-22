import { Model } from "sequelize-typescript";
import { Profile } from "./profile.model";
export declare class Residence extends Model {
    residence_uuid: string;
    type: string;
    state: string;
    city: string;
    zip_code: number;
    address: string;
    profile_uuid: String;
    profile: Profile;
}
