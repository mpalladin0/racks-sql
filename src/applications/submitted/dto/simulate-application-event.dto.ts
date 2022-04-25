
export enum SimulateApplicationEventTypes {
    Approve = 'Approve',
    Deny = 'Deny'
}
export class SimulateApplicationEventDto {
    user_uuid: string
    simulation_type: SimulateApplicationEventTypes
}