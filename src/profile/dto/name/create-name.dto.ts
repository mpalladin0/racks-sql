import { ApiProperty } from "@nestjs/swagger"

export class CreateNameDto {
    @ApiProperty({ type: 'string' })
    first: string

    @ApiProperty({ type: 'string' })
    middle: string

    @ApiProperty({ type: 'string' })
    last: string
}