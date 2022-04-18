import { Column, Table } from "sequelize-typescript";

@Table
export class Account {

    @Column
    account_uuid: string

    @Column
    type: string

    @Column
    limits: string

    // @Column
    

}
