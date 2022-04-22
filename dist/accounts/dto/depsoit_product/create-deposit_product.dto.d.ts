import { AccountStatusTypes } from "src/accounts/models/account.model";
import { CreatePurposeDto } from "./create-purpose.dto";
export declare class CreateDepositProductDto {
    purpose: CreatePurposeDto;
    status: AccountStatusTypes;
    currency: string;
}
