import { ApiProperty } from "@nestjs/swagger"

export class LoginUserDto {
    @ApiProperty({ type: 'string' })
    email: string

    @ApiProperty({ type: 'string' })
    password: string
}