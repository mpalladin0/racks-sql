import { UUID, UUIDV4 } from "sequelize";
import { Column, Table } from "sequelize-typescript";


@Table
export class DepositProduct {
    @Column({ type: UUID, defaultValue: UUIDV4, primaryKey: true   })
    depositproduct_uuid: string;

}