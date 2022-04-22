import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
export declare enum ApplicationStatus {
    pending = "pending",
    pending_review = "pending_review",
    approved = "approved",
    denied = "denied",
    awaiting_documents = "awaiting_documents"
}
export declare class Application extends Model {
    application_uuid: string;
    url: string;
    unit_id: string;
    status: string;
    user_uuid: String;
    user: User;
}
