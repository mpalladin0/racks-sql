import { ApiProperty } from "@nestjs/swagger"
import { CreateNameDto } from "../name/create-name.dto"
import { CreateResidenceDto } from "../residence/create-residence.dto"

export class CreateProfileDto {
    @ApiProperty({ type: [CreateNameDto] })
    name: CreateNameDto

    @ApiProperty({ type: [CreateResidenceDto] })
    residence: CreateResidenceDto
}
