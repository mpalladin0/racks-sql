import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationFormDto {
    @ApiProperty()
    user_uuid: string
}
