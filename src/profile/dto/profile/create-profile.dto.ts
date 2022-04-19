import { ApiProperty } from "@nestjs/swagger"
import { CreateNameDto } from "../name/create-name.dto"

export class CreateProfileDto {
    @ApiProperty({ type: [CreateNameDto] })
    name: CreateNameDto
}
