import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './profile/create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
