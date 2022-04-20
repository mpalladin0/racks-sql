
type ResidenceTypes = 'Home' | 'Business' | 'Work' | 'Primary' | 'Secondary'

export class CreateResidenceDto {
    type: ResidenceTypes
    state: string
    city: string
    zip_code: number
    address: string
}