import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, NotEmpty, NotNull } from "sequelize-typescript"

export class CreateUserDto {
    @ApiProperty({ type: 'string' })
    email: string

    @ApiProperty({ type: 'string' })
    password: string
}
