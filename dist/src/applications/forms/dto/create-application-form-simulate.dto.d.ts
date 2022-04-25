export declare enum CreatApplicationFormDtoSimulationTypes {
    PendingReview = "PendingReview",
    AwaitingDocuments = "AwaitingDocuments",
    Denied = "Denied"
}
export declare class CreateApplicationFormSimulationDto {
    user_uuid: string;
    simulation_type: CreatApplicationFormDtoSimulationTypes;
}
