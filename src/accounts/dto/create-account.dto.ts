import { AccountCurrencyTypes } from "../models/account.model";
import { DepositProductPurposeTypes, DepositProductTierTypes } from "../models/deposit_product.model";

export class CreateAccountDto {
    deposit_product: {
        purpose: DepositProductPurposeTypes
        tier: DepositProductTierTypes
    }
    currency: AccountCurrencyTypes
}