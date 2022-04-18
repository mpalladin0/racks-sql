import { UUID, UUIDV4 } from "sequelize";
import { Column, Table } from "sequelize-typescript";


/**
 * See: https://docs.unit.co/deposit-accounts#deposit-products
 */

@Table
export class DepositProduct {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    depositproduct_uuid: string;

    /**
     * TBD
     */
    @Column
    type: string;

}