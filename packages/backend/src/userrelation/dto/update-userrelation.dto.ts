import { PartialType } from '@nestjs/mapped-types';
import { CreateUserrelationDto } from './create-userrelation.dto';

export class UpdateUserrelationDto extends PartialType(CreateUserrelationDto) {}
