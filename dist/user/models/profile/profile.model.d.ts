import { Model } from "sequelize-typescript";
import { User } from "../user.model";
import { Residence } from "./residence.model";
export declare class Profile extends Model {
    profile_uuid: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    dob: string;
    residence: Residence[];
    user_uuid: String;
    user: User;
}
