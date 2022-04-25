import { ApiProperty } from "@nestjs/swagger";

export enum CreatApplicationFormDtoSimulationTypes {
    PendingReview = 'PendingReview',
    AwaitingDocuments = 'AwaitingDocuments',
    Denied = 'Denied'
}

export class CreateApplicationFormSimulationDto {
    @ApiProperty()
    user_uuid: string

    @ApiProperty()
    simulation_type: CreatApplicationFormDtoSimulationTypes
}
