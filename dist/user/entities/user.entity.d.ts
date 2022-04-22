import { Model } from "sequelize-typescript";
export declare class User extends Model {
    email: string;
    password: string;
    uid: string;
}
