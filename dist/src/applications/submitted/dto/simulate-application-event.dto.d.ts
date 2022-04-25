export declare enum SimulateApplicationEventTypes {
    Approve = "Approve",
    Deny = "Deny"
}
export declare class SimulateApplicationEventDto {
    user_uuid: string;
    simulation_type: SimulateApplicationEventTypes;
}
