import { Model } from "sequelize-typescript";
import { User } from "src/user/models/user.model";
export declare class ApplicationDocumentsModel extends Model {
    application_documents_uuid: string;
    application_uuid: string;
    application: User;
}
