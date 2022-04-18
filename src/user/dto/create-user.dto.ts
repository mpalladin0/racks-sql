import { IsEmail, NotEmpty, NotNull } from "sequelize-typescript"

export class CreateUserDto {
    email: string
    password: string
}
