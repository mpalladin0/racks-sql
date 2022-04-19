import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationDto {
    @ApiProperty()
    user_uuid: string
}
