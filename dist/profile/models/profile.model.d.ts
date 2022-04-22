import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
import { Name } from "./name.model";
import { Residence } from "./residence.model";
export declare class Profile extends Model {
    profile_uuid: string;
    name: Name[];
    dob: string;
    residence: Residence[];
    user_uuid: String;
    user: User;
}
