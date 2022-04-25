import { ConfigOptions } from './interfaces/config-options.interface';
import { Unit } from '@unit-finance/unit-node-sdk';
import { UnitEventRacks } from './event/UnitEvent.racks.event';
export declare class RacksBank {
    private readonly unitService;
    readonly unitRef: Unit;
    constructor(options: ConfigOptions);
    handleUnitEvents(event: UnitEventRacks): Promise<void>;
}
