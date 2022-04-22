declare type ResidenceTypes = 'Home' | 'Business' | 'Work' | 'Primary' | 'Secondary';
export declare class CreateResidenceDto {
    type: ResidenceTypes;
    state: string;
    city: string;
    zip_code: number;
    address: string;
}
export {};
